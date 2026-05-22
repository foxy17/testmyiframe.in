import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  AlertTriangle, 
  Code, 
  ExternalLink, 
  Cookie, 
  Smartphone,
  Lock,
  Globe
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const IframeGuide: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const steps = [
    {
      number: "01",
      title: "Enter Webpage URL",
      description: "Type or paste the URL of the webpage you want to test. Ensure it includes the protocol (e.g., https://)."
    },
    {
      number: "02",
      title: "Configure Security Sandbox",
      description: "Select which permissions to allow. Use our presets like 'Secure' for untrusted pages or 'Permissive' for full features."
    },
    {
      number: "03",
      title: "Adjust Responsive Dimensions",
      description: "Test how the iframe renders in different device viewports using presets (mobile, tablet, desktop) or set custom dimensions."
    },
    {
      number: "04",
      title: "Analyze Diagnostics & Code",
      description: "If it fails, review security headers in the debug panel. Once satisfied, copy the auto-generated clean iframe HTML."
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "What is an iframe tester and why do developers use it?",
      answer: "An iframe tester is an online utility that simulates how a webpage renders within an HTML <iframe> element. Developers use it to verify embeddability, analyze browser security policies, test responsive layout breakpoints, and debug cross-origin restriction issues during integration."
    },
    {
      question: "Why does the iframe show 'Refused to connect' or remain completely blank?",
      answer: "This security barrier is triggered by HTTP headers on the target website. Specifically, the X-Frame-Options header (configured as DENY or SAMEORIGIN) or Content Security Policy (CSP) frame-ancestors directive prevents external websites from embedding their content. This is a critical security protocol implemented by major web properties to prevent clickjacking and security exploits."
    },
    {
      question: "How can I allow other websites to embed my webpage in an iframe?",
      answer: "To permit embedding, you must configure your server's HTTP headers. You should modify or remove the X-Frame-Options header, or define specific trusted origins in your Content Security Policy (CSP) using the frame-ancestors directive (e.g., Content-Security-Policy: frame-ancestors 'self' https://trusteddomain.com)."
    },
    {
      question: "Why do some cookies or login states fail inside the embedded iframe?",
      answer: "Modern web browsers enforce strict security policies regarding third-party cookies. If your embedded webpage sets cookies without the 'SameSite=None; Secure' attributes, the browser will block them. This causes authentication states, user sessions, and shopping carts to fail when loaded inside an iframe context."
    },
    {
      question: "Can I test non-HTTPS (HTTP) URLs in this iframe tester?",
      answer: "If the parent testing tool is loaded over HTTPS, browsers enforce mixed content restrictions and block any non-secure HTTP iframe sources. For local development or HTTP testing, you can use our tool, but you may need to load the application locally or adjust your browser security settings temporarily to allow insecure content."
    },
    {
      question: "What is the HTML iframe sandbox attribute and which values should I use?",
      answer: "The sandbox attribute applies strict restrictions to the iframe content to isolate it from the parent page. By default, adding sandbox='' disables scripts, forms, popups, and same-origin cookies. You can grant selective permissions like allow-scripts (allows JS execution), allow-forms (allows submission), allow-popups (allows new tabs), and allow-same-origin (allows cookies) based on the level of trust you have in the embedded site."
    },
    {
      question: "How can I enforce HTTPS and enable Strict-Transport-Security (HSTS) on GitHub Pages?",
      answer: "GitHub Pages does not support configuring custom HTTP headers directly. To enable HSTS (Strict-Transport-Security) for your custom domain on GitHub Pages, you should configure a cloud proxy/CDN service like Cloudflare. In your Cloudflare dashboard, toggle 'Always Use HTTPS' and enable 'Strict Transport Security (HSTS)' under SSL/TLS > Edge Certificates settings."
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* Introduction and How-to Steps */}
      <div className="space-y-8">
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-clayDisplay font-medium tracking-[-0.03em] text-clay-ink">
            How to Test and Debug Iframes
          </h2>
          <p className="text-clay-body text-base max-w-3xl leading-relaxed font-clayBody">
            Follow this simple checklist to test any webpage embed capability, adjust layout sandboxing, and debug browser console errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-clay-surface-card border border-clay-hairline rounded-clay-lg p-6 space-y-4 hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="text-3xl font-clayDisplay font-medium text-clay-peach">
                {step.number}
              </div>
              <div className="space-y-2">
                <h3 className="font-clayDisplay font-medium text-clay-ink text-lg leading-snug">
                  {step.title}
                </h3>
                <p className="text-clay-body text-sm leading-relaxed font-clayBody">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saturated Clay Cards explaining technical concepts */}
      <div className="space-y-8">
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-clayDisplay font-medium tracking-[-0.03em] text-clay-ink">
            Deep-Dive: Iframe Security & Troubleshooting
          </h2>
          <p className="text-clay-body text-base max-w-3xl leading-relaxed font-clayBody">
            Learn how browser security policies control cross-origin rendering, sandbox restrictions, and embedded user credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Ochre Card */}
          <div className="bg-clay-ochre-dark text-white rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-white/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em] text-white">
                What is an Iframe Tester?
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-clayBody">
                An iframe tester lets you preview how external websites display when embedded in an HTML iframe element. It is an essential utility for developers building integrations, portals, dashboards, widget loaders, or web applications that depend on embedded content.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>Developer Utility</span>
            </div>
          </div>

          {/* Card 2: Peach Card */}
          <div className="bg-clay-peach-dark text-white rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em] text-white">
                X-Frame-Options & CSP
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-clayBody">
                HTTP headers are the most common cause of iframe failures. If a site responds with <code>X-Frame-Options: DENY</code> or a Content Security Policy (CSP) directive like <code>frame-ancestors 'self'</code>, the browser will refuse to load it to protect against clickjacking attacks.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>Security Protocols</span>
            </div>
          </div>

          {/* Card 3: Lavender Card */}
          <div className="bg-clay-lavender-dark text-white rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-white/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em] text-white">
                The Sandbox Attribute
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-clayBody">
                The <code>sandbox</code> HTML attribute enforces strict security restrictions on embedded webpages. It allows developers to prevent untrusted content from running malicious scripts, submitting unwanted forms, creating popup windows, or hijacking the parent page navigation.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>Content Isolation</span>
            </div>
          </div>

          {/* Card 4: Pink Card */}
          <div className="bg-clay-pink text-white rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-white/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em] text-white">
                Troubleshooting Errors
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-clayBody">
                When an iframe fails, check the browser's developer console (F12) for error logs. Use the context selector dropdown in the Console/Elements panel to switch scope to the iframe to run queries inside it, and check the Network tab's response headers for CSP/X-Frame-Options blocks.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>Debugging Guide</span>
            </div>
          </div>

          {/* Card 5: Teal Card (Dark) */}
          <div className="bg-clay-teal text-white rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-white/10 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em] text-white">
                HTML Code Generator
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-clayBody">
                Configure your iframe's dimensions, sandbox privileges, and style options in real-time. Once the setup renders correctly, use our automated code generator to copy clean, production-ready HTML code to drop directly into your project files.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>Code Snippets</span>
            </div>
          </div>

          {/* Card 6: Cream Surface Card */}
          <div className="bg-clay-surface-card border border-clay-hairline text-clay-ink rounded-clay-xl p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-clay-md bg-clay-ink/5 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-clay-ink" />
              </div>
              <h3 className="text-xl font-clayDisplay font-semibold tracking-[-0.01em]">
                SameSite Cookie Issues
              </h3>
              <p className="text-clay-body text-sm leading-relaxed font-clayBody">
                To prevent cross-site tracking, modern browsers block third-party cookies inside iframes. If your login/session fails, open DevTools and inspect the **Application &gt; Cookies** tab for your domain, or check the **Issues** tab for warning notices about missing <code>SameSite=None; Secure</code> attributes.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.5px] uppercase">
              <span>State & Authentication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Comparison Table */}
      <div className="space-y-8">
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-clayDisplay font-medium tracking-[-0.03em] text-clay-ink">
            Iframe Sandbox Presets Comparison
          </h2>
          <p className="text-clay-body text-base max-w-3xl leading-relaxed font-clayBody">
            Compare our pre-configured sandbox presets to choose the correct balance between functionality and security for your embeds.
          </p>
        </div>

        <div className="border border-clay-hairline rounded-clay-lg overflow-hidden bg-clay-surface-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-clay-surface-strong border-b border-clay-hairline">
                  <th className="p-4 font-clayDisplay font-semibold text-clay-ink">Preset Name</th>
                  <th className="p-4 font-clayDisplay font-semibold text-clay-ink">Enabled Attributes</th>
                  <th className="p-4 font-clayDisplay font-semibold text-clay-ink">Security Profile</th>
                  <th className="p-4 font-clayDisplay font-semibold text-clay-ink">Ideal Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clay-hairline">
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 font-semibold text-clay-ink">🛡️ Secure</td>
                  <td className="p-4 text-clay-body text-xs font-mono">None (Empty sandbox)</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-clay-pill bg-clay-ink text-white text-xs font-semibold">Maximum</span></td>
                  <td className="p-4 text-clay-body">Embedding completely untrusted or third-party external webpages.</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 font-semibold text-clay-ink">✅ Permissive</td>
                  <td className="p-4 text-clay-body text-xs font-mono">scripts, forms, popups, same-origin, clipboard, presentation</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-clay-pill bg-clay-peach-dark text-white text-xs font-semibold">Low</span></td>
                  <td className="p-4 text-clay-body">Highly trusted internal tools or widgets requiring full interaction.</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 font-semibold text-clay-ink">🎥 Media</td>
                  <td className="p-4 text-clay-body text-xs font-mono">scripts, fullscreen, autoplay, presentation</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-clay-pill bg-clay-lavender-dark text-white text-xs font-semibold">Medium</span></td>
                  <td className="p-4 text-clay-body">Video players (YouTube, Vimeo, Twitch) and multimedia embeds.</td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-4 font-semibold text-clay-ink">🔄 Interactive</td>
                  <td className="p-4 text-clay-body text-xs font-mono">scripts, forms, modals, clipboard, popups</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-clay-pill bg-clay-ochre-dark text-white text-xs font-semibold">Medium</span></td>
                  <td className="p-4 text-clay-body">Payment gateways, sign-in forms, and interactive feedback widgets.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Troubleshooting Matrix */}
      <div className="space-y-8">
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-clayDisplay font-medium tracking-[-0.03em] text-clay-ink">
            Common Iframe Errors & Solutions
          </h2>
          <p className="text-clay-body text-base max-w-3xl leading-relaxed font-clayBody">
            Diagnose and fix the three most common iframe bugs encountered during web integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-clay-surface-card border border-clay-hairline rounded-clay-lg p-6 space-y-4 shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center space-x-2 text-clay-error">
              <span className="text-xl font-bold">🚫</span>
              <span className="font-clayDisplay font-bold text-xs uppercase tracking-[0.5px]">Headers Blocked</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-clayDisplay font-semibold text-clay-ink text-base">X-Frame-Options Error</h3>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Symptom:</strong> The frame stays blank or says "Connection Refused".
              </p>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Fix:</strong> Modify the target server headers to remove <code>X-Frame-Options: SAMEORIGIN</code> or configure the CSP <code>frame-ancestors</code> directive to whitelist your host.
              </p>
            </div>
          </div>

          <div className="bg-clay-surface-card border border-clay-hairline rounded-clay-lg p-6 space-y-4 shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center space-x-2 text-clay-peach-dark">
              <span className="text-xl font-bold">⚠️</span>
              <span className="font-clayDisplay font-bold text-xs uppercase tracking-[0.5px]">Mixed Content</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-clayDisplay font-semibold text-clay-ink text-base">HTTPS Protocol Mismatch</h3>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Symptom:</strong> Browser blocks loading of HTTP iframe urls.
              </p>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Fix:</strong> Upgrade the source iframe URL from <code>http://</code> to <code>https://</code>, or host and run this testing application on a local server.
              </p>
            </div>
          </div>

          <div className="bg-clay-surface-card border border-clay-hairline rounded-clay-lg p-6 space-y-4 shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center space-x-2 text-clay-lavender-dark">
              <span className="text-xl font-bold">🔑</span>
              <span className="font-clayDisplay font-bold text-xs uppercase tracking-[0.5px]">Session Lost</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-clayDisplay font-semibold text-clay-ink text-base">SameSite Cookie Blocks</h3>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Symptom:</strong> Users are logged out or sessions fail inside the iframe.
              </p>
              <p className="text-xs text-clay-body leading-relaxed">
                <strong>Fix:</strong> Ensure the cookies issued by the embedded webpage explicitly set <code>SameSite=None; Secure</code> to allow third-party context operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Example */}
      <div className="space-y-8">
        <div className="bg-clay-surface-card border border-clay-hairline rounded-clay-xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-clay-lavender/30 text-clay-lavender-dark rounded-clay-pill font-bold text-xs uppercase tracking-wider">
              Example Case Study
            </div>
            <h3 className="text-2xl font-clayDisplay font-medium text-clay-ink">
              How to Embed a YouTube Video Player
            </h3>
            <p className="text-sm text-clay-body leading-relaxed max-w-3xl font-clayBody">
              YouTube and other media players require a careful mix of sandbox features. Disabling scripts completely makes the player un-interactive, while failing to allow fullscreen blocks native sizing options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-sm text-clay-body leading-relaxed font-clayBody">
              <p>
                To embed YouTube securely while maintaining full functionality:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the <strong>Media</strong> preset configuration.</li>
                <li>Ensure <code>allow-scripts</code> is toggled in the sandbox attribute to run the video player runtime.</li>
                <li>Add the <code>allow="autoplay; fullscreen"</code> parameter so YouTube can invoke autoplay events and enter fullscreen mode on double-click.</li>
                <li>Set <code>loading="lazy"</code> to defer loading the iframe until it is close to the viewport.</li>
              </ul>
            </div>

            <div className="bg-clay-surface-strong border border-clay-hairline rounded-clay-lg p-6 font-mono text-xs text-clay-ink overflow-x-auto relative">
              <div className="absolute top-2 right-2 px-2 py-1 bg-clay-hairline rounded-clay-xs text-[10px] uppercase font-sans font-bold text-clay-muted">
                HTML Code
              </div>
              <pre className="mt-2">
{`<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  sandbox="allow-scripts"
  allow="autoplay; fullscreen"
  loading="lazy"
  width="560"
  height="315"
  frameborder="0"
></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-clayDisplay font-medium tracking-[-0.03em] text-clay-ink">
            Frequently Asked Questions
          </h2>
          <p className="text-clay-body text-base leading-relaxed font-clayBody">
            Get quick answers to common questions about testing, sandboxing, and embedding iframe content.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFAQIndex === index;
            return (
              <div 
                key={index} 
                className="bg-clay-surface-card border border-clay-hairline rounded-clay-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span className="font-clayDisplay font-medium text-clay-ink text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-clay-ink/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-clay-ink/60 flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-clay-hairline bg-white/40">
                    <p className="text-clay-body text-sm leading-relaxed font-clayBody whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};
