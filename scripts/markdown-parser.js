/**
 * Simple Markdown Parser
 * Supports basic markdown syntax: headers, bold, italic, links, code blocks, lists
 */
class MarkdownParser {
    static parse(markdown) {
        if (!markdown) return '';
        
        let html = markdown;
        
        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Headers
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Links
        html = html.replace(/\[([^\[]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
        
        // Lists
        html = html.replace(/^\s*\-\s(.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Numbered lists
        html = html.replace(/^\s*\d+\.\s(.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, function(match) {
            if (!match.includes('<ul>')) {
                return '<ol>' + match + '</ol>';
            }
            return match;
        });
        
        // Paragraphs
        html = html.replace(/^(?!<[hou]|<li|\s*$)(.+)$/gm, '<p>$1</p>');
        
        return html;
    }
}