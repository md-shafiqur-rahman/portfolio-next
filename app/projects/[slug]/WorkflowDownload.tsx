"use client";
import { useState, useEffect } from "react";

interface WorkflowDownloadProps {
    slug: string;
    workflowFile: string;
    title: string;
}

type TabKey = "preview" | "guide";

export default function WorkflowDownload({ slug, workflowFile, title }: WorkflowDownloadProps) {
    const [jsonContent, setJsonContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>("preview");

    const fileUrl = `/projects/${slug}/${workflowFile}`;

    useEffect(() => {
        fetch(fileUrl)
            .then((res) => {
                if (!res.ok) throw new Error("not found");
                return res.text();
            })
            .then((text) => {
                try {
                    const parsed = JSON.parse(text);
                    setJsonContent(JSON.stringify(parsed, null, 2));
                } catch {
                    setJsonContent(text);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [fileUrl]);

    const handleCopy = async () => {
        if (!jsonContent) return;
        await navigator.clipboard.writeText(jsonContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const filename = `shafiqur-${slug}-workflow.json`;
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = filename;
        a.click();
    };

    if (loading || error) return null;

    // Count nodes roughly from JSON
    let nodeCount = 0;
    try {
        const parsed = JSON.parse(jsonContent!);
        const nodes = parsed?.nodes ?? parsed?.workflow?.nodes ?? [];
        nodeCount = Array.isArray(nodes) ? nodes.length : 0;
    } catch {}

    const previewLines = jsonContent?.split("\n").slice(0, 20).join("\n") ?? "";
    const hasMore = (jsonContent?.split("\n").length ?? 0) > 20;

    return (
        <div className="workflow-download-section">
            {/* Header */}
            <div className="workflow-header">
                <div className="workflow-header-left">
                    <div className="workflow-icon-badge">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </div>
                    <div>
                        <div className="workflow-header-title">n8n Workflow File</div>
                        <div className="workflow-header-sub">
                            Import this workflow directly into your n8n instance
                            {nodeCount > 0 && (
                                <span className="workflow-node-count">{nodeCount} nodes</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="workflow-action-btns">
                    <button className="workflow-btn workflow-btn-copy" onClick={handleCopy} title="Copy JSON">
                        {copied ? (
                            <>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                Copy JSON
                            </>
                        )}
                    </button>
                    <button className="workflow-btn workflow-btn-download" onClick={handleDownload} title="Download JSON">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download .json
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="workflow-tabs">
                <button
                    className={`workflow-tab${activeTab === "preview" ? " active" : ""}`}
                    onClick={() => setActiveTab("preview")}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                    JSON Preview
                </button>
                <button
                    className={`workflow-tab${activeTab === "guide" ? " active" : ""}`}
                    onClick={() => setActiveTab("guide")}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                    </svg>
                    How to Import
                </button>
            </div>

            {/* Tab: JSON Preview */}
            {activeTab === "preview" && (
                <div className="workflow-code-wrap">
                    <div className="workflow-code-topbar">
                        <div className="workflow-code-dots">
                            <span /><span /><span />
                        </div>
                        <span className="workflow-code-filename">
                            shafiqur-{slug}-workflow.json
                        </span>
                    </div>
                    <pre className={`workflow-code-block${expanded ? " expanded" : ""}`}>
                        <code>{expanded ? jsonContent : previewLines}</code>
                    </pre>
                    {hasMore && (
                        <button
                            className="workflow-expand-btn"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                    Collapse
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                    Show full JSON ({jsonContent?.split("\n").length} lines)
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Tab: How to Import */}
            {activeTab === "guide" && (
                <div className="workflow-guide">
                    <div className="workflow-guide-intro">
                        <strong>New to n8n?</strong> No problem. Follow these steps to get this workflow running in your own n8n instance.
                    </div>

                    <ol className="workflow-steps">
                        <li className="workflow-step">
                            <div className="step-num">1</div>
                            <div className="step-content">
                                <div className="step-title">Get n8n</div>
                                <div className="step-desc">
                                    Sign up free at{" "}
                                    <a href="https://n8n.io" target="_blank" rel="noopener" className="workflow-link">n8n.io</a>
                                    {" "}(cloud) or self-host it on your server. The cloud trial is free to start.
                                </div>
                            </div>
                        </li>
                        <li className="workflow-step">
                            <div className="step-num">2</div>
                            <div className="step-content">
                                <div className="step-title">Download the workflow file</div>
                                <div className="step-desc">
                                    Click the <strong>Download .json</strong> button above to save the file to your computer.
                                </div>
                            </div>
                        </li>
                        <li className="workflow-step">
                            <div className="step-num">3</div>
                            <div className="step-content">
                                <div className="step-title">Import into n8n</div>
                                <div className="step-desc">
                                    Open n8n → Click <strong>+ New workflow</strong> → Click the <strong>⋮ menu (top right)</strong> → Select <strong>&quot;Import from file&quot;</strong> → Upload the .json file.
                                </div>
                                <div className="step-tip">
                                    💡 You can also paste the JSON directly: menu → &quot;Import from URL or JSON&quot;
                                </div>
                            </div>
                        </li>
                        <li className="workflow-step">
                            <div className="step-num">4</div>
                            <div className="step-content">
                                <div className="step-title">Add your credentials</div>
                                <div className="step-desc">
                                    Connect your own API keys (Gmail, HubSpot, OpenAI, etc.) — each node will show a red warning until you do. n8n stores credentials securely.
                                </div>
                            </div>
                        </li>
                        <li className="workflow-step">
                            <div className="step-num">5</div>
                            <div className="step-content">
                                <div className="step-title">Test &amp; activate</div>
                                <div className="step-desc">
                                    Hit <strong>Test workflow</strong> to do a dry run. Once everything works, toggle it to <strong>Active</strong> — it&apos;ll run automatically from now on.
                                </div>
                            </div>
                        </li>
                    </ol>

                    <div className="workflow-guide-cta">
                        <span>🙋</span>
                        <span>
                            Need help setting this up?{" "}
                            <a href="mailto:shafiqur.dev@gmail.com?subject=Workflow%20Setup%20Help%20-%20{title}" className="workflow-link">
                                Send me a message
                            </a>
                            {" "}— I offer setup assistance for all workflows I&apos;ve shared.
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
