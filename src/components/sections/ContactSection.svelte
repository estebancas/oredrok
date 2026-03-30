<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import PixelButton from '../ui/PixelButton.svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLHeadingElement;
  let formRef: HTMLFormElement;

  let formData = $state({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
    agreedToTerms: false
  });

  let isSubmitting = $state(false);
  let submitMessage = $state('');
  let isError = $state(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting = true;
    submitMessage = '';
    isError = false;

    try {
      // Send form data to Cloudflare Worker
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          agreeToTerms: formData.agreedToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success
      isSubmitting = false;
      submitMessage = data.message || 'Thanks! I\'ll get back to you soon. ✅';

      // Reset form
      formData = {
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: '',
        agreedToTerms: false
      };
    } catch (error) {
      // Error handling
      isSubmitting = false;
      isError = true;
      submitMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again or email me directly.';
      console.error('Form submission error:', error);
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(headingRef, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top 70%',
          once: true
        }
      });

      gsap.from(formRef, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: formRef,
          start: 'top 75%',
          once: true
        }
      });
    }
  });
</script>

<section
  bind:this={sectionRef}
  class="contact-section section-container"
  id="contact"
>
  <h2
    bind:this={headingRef}
    class="section-title pixel-header"
  >
    LET'S BUILD<br />SOMETHING AMAZING
  </h2>

  <p class="section-subtitle pixel-body">
    Ready to start your next project? Get in touch!
  </p>

  <form
    bind:this={formRef}
    class="contact-form pixel-border-blue"
    onsubmit={handleSubmit}
  >
    <div class="form-grid">
      <!-- Name -->
      <div class="form-group">
        <label for="name" class="pixel-label">Name*</label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          class="pixel-input"
          placeholder="Your name"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email" class="pixel-label">Email*</label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          required
          class="pixel-input"
          placeholder="your@email.com"
        />
      </div>

      <!-- Project Type -->
      <div class="form-group">
        <label for="projectType" class="pixel-label">Project Type</label>
        <select
          id="projectType"
          bind:value={formData.projectType}
          class="pixel-input"
        >
          <option value="">Select type</option>
          <option value="web-app">Web Application</option>
          <option value="mobile-backend">Mobile Backend</option>
          <option value="ecommerce">E-Commerce</option>
          <option value="api">API Development</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Budget -->
      <div class="form-group">
        <label for="budget" class="pixel-label">Budget</label>
        <select
          id="budget"
          bind:value={formData.budget}
          class="pixel-input"
        >
          <option value="">Select range</option>
          <option value="5k-10k">$5k - $10k</option>
          <option value="10k-25k">$10k - $25k</option>
          <option value="25k-50k">$25k - $50k</option>
          <option value="50k+">$50k+</option>
        </select>
      </div>
    </div>

    <!-- Message -->
    <div class="form-group full-width">
      <label for="message" class="pixel-label">Message*</label>
      <textarea
        id="message"
        bind:value={formData.message}
        required
        rows="5"
        class="pixel-input"
        placeholder="Tell me about your project..."
      ></textarea>
    </div>

    <!-- Checkbox -->
    <div class="form-checkbox">
      <input
        type="checkbox"
        id="terms"
        bind:checked={formData.agreedToTerms}
        required
        class="pixel-checkbox"
      />
      <label for="terms" class="pixel-body checkbox-label">
        I agree to be contacted about this project
      </label>
    </div>

    <!-- Submit Button -->
    <div class="form-submit">
      <PixelButton
        variant="green"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message ►'}
      </PixelButton>
    </div>

    <!-- Submit Message -->
    {#if submitMessage}
      <p class="submit-message pixel-body" class:error={isError}>{submitMessage}</p>
    {/if}
  </form>

  <!-- Footer Info -->
  <div class="contact-footer">
    <p class="pixel-body">
      Or email me directly at
      <a href="mailto:your@email.com" class="link-accent">your@email.com</a>
    </p>
    <div class="social-links">
      <a href="https://github.com/estebancas" target="_blank" rel="noopener" class="social-link pixel-cursor">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/estebancas94" target="_blank" rel="noopener" class="social-link pixel-cursor">
        LinkedIn
      </a>
    </div>
  </div>
</section>

<style>
  .contact-section {
    background: var(--bg-primary);
    position: relative;
    padding-bottom: var(--spacing-4xl);
  }

  .section-title {
    font-size: clamp(32px, 6vw, 56px);
    text-align: center;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
    line-height: 1.4;
    text-shadow:
      3px 3px 0 var(--accent-green),
      6px 6px 0 var(--bg-secondary);
  }

  .section-subtitle {
    font-size: clamp(18px, 3vw, 24px);
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-3xl);
  }

  /* Form */
  .contact-form {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-3xl);
    background: var(--bg-secondary);
    border-width: var(--border-pixel);
    border-radius: var(--radius-md);
    box-shadow:
      0 0 30px rgba(59, 130, 246, 0.2),
      8px 8px 0 var(--accent-blue-dark);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .pixel-label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .pixel-input {
    font-family: 'VT323', monospace;
    font-size: 18px;
    padding: 12px 16px;
    background: var(--bg-primary);
    border: var(--border-thick) solid var(--border-pixel);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .pixel-input:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .pixel-input::placeholder {
    color: var(--text-muted);
  }

  select.pixel-input {
    cursor: pointer;
  }

  textarea.pixel-input {
    resize: vertical;
    min-height: 120px;
  }

  /* Checkbox */
  .form-checkbox {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) 0;
  }

  .pixel-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: var(--accent-green);
  }

  .checkbox-label {
    font-size: 16px;
    color: var(--text-secondary);
    cursor: pointer;
  }

  /* Submit */
  .form-submit {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-lg);
  }

  .submit-message {
    text-align: center;
    margin-top: var(--spacing-md);
    color: var(--accent-green);
    font-size: 18px;
  }

  .submit-message.error {
    color: #ef4444;
  }

  /* Footer */
  .contact-footer {
    margin-top: var(--spacing-4xl);
    text-align: center;
  }

  .contact-footer p {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .link-accent {
    color: var(--accent-blue);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
    transition: color 0.2s ease;
  }

  .link-accent:hover {
    color: var(--accent-green);
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-lg);
  }

  .social-link {
    font-family: 'Press Start 2P', monospace;
    font-size: 12px;
    color: var(--text-primary);
    padding: 12px 20px;
    border: var(--border-pixel) solid var(--border-light);
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .social-link:hover {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--accent-blue-dark);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .section-title {
      font-size: clamp(24px, 8vw, 32px);
      text-shadow:
        2px 2px 0 var(--accent-green),
        4px 4px 0 var(--bg-secondary);
    }

    .contact-form {
      padding: var(--spacing-lg);
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }

    .social-links {
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
    }

    .social-link {
      width: 100%;
      max-width: 300px;
      text-align: center;
    }
  }
</style>
