/**
 * ============================================================
 * VTUBER DESIGN UK - AI Assistant & Tawk.to Integration
 * ============================================================
 */

(function () {
  // ----------------------------------------------------------
  // 1. TAWK.TO LIVE CHAT INTEGRATION
  // ----------------------------------------------------------
  const TAWK_PROPERTY_ID = '6ae8e319e252203c32570ce9';
  const TAWK_WIDGET_ID   = '1k6ere6v3';

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  (function () {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0] || document.head;
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    if (s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  })();

  // ----------------------------------------------------------
  // 2. CHATBOT DOM INJECTION
  // ----------------------------------------------------------
  function injectChatbot() {
    // Avoid double injection
    if (document.getElementById('vtd-chat-launcher')) return;

    // Launcher button
    const launcher = document.createElement('div');
    launcher.id = 'vtd-chat-launcher';
    launcher.title = 'Need help? Chat with VTuber Design UK';
    launcher.innerHTML = `
      <svg class="chat-icon" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        <circle cx="8" cy="10" r="1.5"/><circle cx="12" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;

    // Chat Window
    const chatBox = document.createElement('div');
    chatBox.id = 'vtd-chat-box';
    chatBox.innerHTML = `
      <div class="vtd-chat-header">
        <div class="vtd-header-left">
          <div class="vtd-avatar">VD</div>
          <div>
            <h4 class="vtd-header-title">VTuber Assistant</h4>
            <p class="vtd-header-sub">Online &bull; Instant Answers</p>
          </div>
        </div>
        <div class="vtd-header-actions">
          <button class="vtd-live-btn" id="vtd-live-agent-btn" title="Talk to a Live Person">
            💬 Live Agent
          </button>
          <button class="vtd-close-btn" id="vtd-close-btn">&times;</button>
        </div>
      </div>
      <div class="vtd-chat-messages" id="vtd-chat-messages">
        <div class="vtd-msg bot">
          👋 Welcome to <strong>VTUBER DESIGN UK</strong>! I'm your virtual assistant. How can I assist with your design vision today?
          <div class="vtd-quick-replies">
            <span class="vtd-chip" data-query="services">🎨 Design Services</span>
            <span class="vtd-chip" data-query="pricing">📦 Packages & VAT</span>
            <span class="vtd-chip" data-query="contact">✉️ Contact Emails</span>
            <span class="vtd-chip" data-query="human">💬 Live Human</span>
          </div>
        </div>
      </div>
      <div class="vtd-chat-input-bar">
        <input type="text" id="vtd-chat-input" placeholder="Ask about services, pricing, rigging..." autocomplete="off">
        <button class="vtd-send-btn" id="vtd-send-btn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatBox);

    // Event listeners
    launcher.addEventListener('click', toggleChat);
    document.getElementById('vtd-close-btn').addEventListener('click', toggleChat);
    document.getElementById('vtd-live-agent-btn').addEventListener('click', switchToLiveAgent);

    const input = document.getElementById('vtd-chat-input');
    const sendBtn = document.getElementById('vtd-send-btn');

    sendBtn.addEventListener('click', () => handleSend(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSend(input.value);
      }
    });

    // Delegate chips
    document.getElementById('vtd-chat-messages').addEventListener('click', (e) => {
      if (e.target.classList.contains('vtd-chip')) {
        const query = e.target.getAttribute('data-query');
        handleQuickQuery(query);
      }
    });
  }

  function toggleChat() {
    const launcher = document.getElementById('vtd-chat-launcher');
    const box = document.getElementById('vtd-chat-box');
    if (!box) return;

    box.classList.toggle('active');
    launcher.classList.toggle('open');
    if (box.classList.contains('active')) {
      setTimeout(() => {
        const input = document.getElementById('vtd-chat-input');
        if (input) input.focus();
      }, 100);
    }
  }

  function switchToLiveAgent() {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      const box = document.getElementById('vtd-chat-box');
      if (box && box.classList.contains('active')) {
        toggleChat();
      }
      try {
        if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
        window.Tawk_API.maximize();
        return;
      } catch (e) {
        console.warn('Tawk error', e);
      }
    } else {
      appendBotMessage(`
        <strong>Connect with a Live Agent:</strong><br>
        Our team is standing by to assist you directly:<br>
        &bull; <strong>Support:</strong> <a href="mailto:support@vtuberdesign.co.uk">support@vtuberdesign.co.uk</a><br>
        &bull; <strong>Finance:</strong> <a href="mailto:finance@vtuberdesign.co.uk">finance@vtuberdesign.co.uk</a><br>
        &bull; <strong>Management:</strong> <a href="mailto:gary.rogers@vtuberdesign.co.uk">gary.rogers@vtuberdesign.co.uk</a>
      `);
    }
  }

  function appendUserMessage(text) {
    const messages = document.getElementById('vtd-chat-messages');
    const msg = document.createElement('div');
    msg.className = 'vtd-msg user';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendBotMessage(html) {
    const messages = document.getElementById('vtd-chat-messages');
    const msg = document.createElement('div');
    msg.className = 'vtd-msg bot';
    msg.innerHTML = html;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleQuickQuery(type) {
    if (type === 'services') {
      appendUserMessage("What services do you offer?");
      setTimeout(() => {
        appendBotMessage(`
          🎨 <strong>VTUBER DESIGN UK Services:</strong><br>
          &bull; <strong>VTuber 2D/3D Rigging & Modeling</strong><br>
          &bull; <strong>Logo & Identity Design</strong> (<a href="/logo-design">Explore</a>)<br>
          &bull; <strong>Custom Website Development</strong> (<a href="/web-development">Explore</a>)<br>
          &bull; <strong>Motion Graphics & Animation</strong> (<a href="/motion-graphics">Explore</a>)<br>
          &bull; <strong>Illustration & Character Design</strong> (<a href="/illustration-design">Explore</a>)<br>
          &bull; <strong>Social Media Marketing & SEO</strong> (<a href="/social-media-marketing">Explore</a>)<br><br>
          Need a custom quote? Visit our <a href="/combo-package">Combo Package</a> or <a href="/contact-us">Contact Us</a>.
        `);
      }, 400);
    } else if (type === 'pricing') {
      appendUserMessage("Tell me about packages and VAT");
      setTimeout(() => {
        appendBotMessage(`
          📦 <strong>Packages & Pricing (UK):</strong><br>
          &bull; All rates are billed in <strong>GBP (£)</strong>.<br>
          &bull; In accordance with UK guidelines, all shown package prices are <strong>exclusive of VAT (exc. VAT)</strong>.<br>
          &bull; Check our full catalogue on the <a href="/packages">Packages Hub</a> or <a href="/logo-packages">Logo Packages</a> and <a href="/web-packages">Web Packages</a>.
        `);
      }, 400);
    } else if (type === 'contact') {
      appendUserMessage("How do I contact you?");
      setTimeout(() => {
        appendBotMessage(`
          ✉️ <strong>Reach Out To Our UK Team:</strong><br>
          &bull; <strong>General & Support:</strong> <a href="mailto:support@vtuberdesign.co.uk">support@vtuberdesign.co.uk</a><br>
          &bull; <strong>Accounts & Finance:</strong> <a href="mailto:finance@vtuberdesign.co.uk">finance@vtuberdesign.co.uk</a><br>
          &bull; <strong>Management:</strong> <a href="mailto:gary.rogers@vtuberdesign.co.uk">gary.rogers@vtuberdesign.co.uk</a><br>
          &bull; <strong>Headquarters:</strong> London, United Kingdom.
        `);
      }, 400);
    } else if (type === 'human') {
      appendUserMessage("I want to speak to a real person");
      setTimeout(() => {
        switchToLiveAgent();
      }, 300);
    }
  }

  function handleSend(text) {
    if (!text || !text.trim()) return;
    const clean = text.trim();
    const input = document.getElementById('vtd-chat-input');
    input.value = '';

    appendUserMessage(clean);

    const lower = clean.toLowerCase();

    setTimeout(() => {
      if (lower.includes('human') || lower.includes('live') || lower.includes('talk') || lower.includes('agent') || lower.includes('person') || lower.includes('tawk')) {
        switchToLiveAgent();
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('vat') || lower.includes('quote') || lower.includes('rate') || lower.includes('pound')) {
        appendBotMessage(`
          Our pricing plans are tailored to your project scope:<br>
          &bull; Starter designs from £35.00 (exc. VAT).<br>
          &bull; Complete branding & combo packages available on our <a href="/packages">Packages page</a>.<br>
          &bull; All pricing is exclusive of VAT (exc. VAT).<br>
          Would you like to discuss a custom package?
        `);
      } else if (lower.includes('email') || lower.includes('contact') || lower.includes('phone') || lower.includes('address') || lower.includes('location')) {
        appendBotMessage(`
          📍 <strong>VTUBER DESIGN UK Contact Details:</strong><br>
          &bull; <strong>Address:</strong> London, United Kingdom<br>
          &bull; <strong>Support:</strong> <a href="mailto:support@vtuberdesign.co.uk">support@vtuberdesign.co.uk</a><br>
          &bull; <strong>Billing:</strong> <a href="mailto:finance@vtuberdesign.co.uk">finance@vtuberdesign.co.uk</a><br>
          &bull; <strong>Direct:</strong> <a href="mailto:gary.rogers@vtuberdesign.co.uk">gary.rogers@vtuberdesign.co.uk</a>
        `);
      } else if (lower.includes('service') || lower.includes('vtuber') || lower.includes('rig') || lower.includes('logo') || lower.includes('web') || lower.includes('design')) {
        appendBotMessage(`
          We specialize in high-impact creative solutions for VTubers and content creators:<br>
          &bull; 2D & 3D Character Rigging & Animation<br>
          &bull; Custom Stream Branding & Logo Design<br>
          &bull; Responsive Creator Websites & E-Commerce<br>
          &bull; Motion Graphics & Overlays<br>
          Visit our <a href="/portfolio">Portfolio</a> to see recent work!
        `);
      } else {
        appendBotMessage(`
          Thank you for reaching out! You can explore our services in the menu above, or connect directly with our support team at <a href="mailto:support@vtuberdesign.co.uk">support@vtuberdesign.co.uk</a>.<br><br>
          Need to speak with a specialist right now? Click <strong>Live Agent</strong> in the top header.
        `);
      }
    }, 450);
  }

  // ----------------------------------------------------------
  // 3. GLOBAL HOOK: openLiveChat()
  // ----------------------------------------------------------
  window.openLiveChat = function () {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      try {
        if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
        window.Tawk_API.maximize();
        return;
      } catch (e) {}
    }
    const box = document.getElementById('vtd-chat-box');
    if (box && !box.classList.contains('active')) {
      toggleChat();
    }
  };

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatbot);
  } else {
    injectChatbot();
  }
})();
