import React, { useState, useMemo } from "react";
import {
  Globe,
  Tag,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Check,
  Send,
  Eye,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { Tool } from "../../types";
import ToolCard from "../ToolCard/ToolCard";
import "./SubmitToolPage.css";

interface SubmitToolPageProps {
  categories: string[];
  onNavigateToTools: () => void;
}

export const SubmitToolPage: React.FC<SubmitToolPageProps> = ({
  categories,
  onNavigateToTools,
}) => {
  // Form State
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Job Boards");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [pricing, setPricing] = useState("100% Free");
  const [tagsInput, setTagsInput] = useState("Remote, Tech, Careers");
  const [features, setFeatures] = useState<string[]>([
    "Direct candidate screening",
    "Verified remote positions",
  ]);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // Submission Flow State
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter out 'All' for submission category choices
  const availableCategories = useMemo(
    () => categories.filter((c) => c !== "All"),
    [categories],
  );

  // Parse comma-separated tags
  const parsedTags = useMemo(() => {
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .slice(0, 4);
  }, [tagsInput]);

  // Derived Preview Tool Object
  const previewTool: Tool = useMemo(() => {
    return {
      id: 9999,
      name: name.trim() || "Your Platform Name",
      tagline:
        tagline.trim() ||
        "The leading platform for verified career opportunities",
      description:
        description.trim() ||
        "Explain what this tool does, key benefits for job hunters or freelancers, and why it belongs in the JobStack directory.",
      url: url.trim() || "https://example.com",
      logo: "",
      category: category,
      tags:
        parsedTags.length > 0 ? parsedTags : ["Remote", "Tech", "Verified"],
      pricing: pricing.trim() || "100% Free",
      rating: 4.8,
      featured: true,
      badge: "Community Suggestion",
      features:
        features.filter((f) => f.trim().length > 0).length > 0
          ? features.filter((f) => f.trim().length > 0)
          : ["Verified platform", "Curated listings"],
    };
  }, [name, tagline, description, url, category, parsedTags, pricing, features]);

  // Feature Bullet Handlers
  const handleAddFeature = () => {
    if (features.length < 4) {
      setFeatures([...features, ""]);
    }
  };

  const handleUpdateFeature = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Form Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Platform name is required.";
    }

    if (!url.trim()) {
      newErrors.url = "Website URL is required.";
    } else if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      newErrors.url = "URL must begin with https:// or http://";
    }

    if (!tagline.trim()) {
      newErrors.tagline = "A short tagline is required.";
    } else if (tagline.trim().length < 8) {
      newErrors.tagline = "Tagline should be at least 8 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "A platform description is required.";
    } else if (description.trim().length < 20) {
      newErrors.description =
        "Please provide a more descriptive summary (min 20 characters).";
    }

    if (!pricing.trim()) {
      newErrors.pricing = "Pricing model is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    setTimeout(() => {
      try {
        const existing = JSON.parse(
          localStorage.getItem("jobstack_user_submissions") || "[]",
        );
        existing.push({
          ...previewTool,
          submitterEmail,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(
          "jobstack_user_submissions",
          JSON.stringify(existing),
        );
      } catch {
        // Ignore localStorage issues
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  };

  const handleReset = () => {
    setName("");
    setUrl("");
    setCategory("Job Boards");
    setTagline("");
    setDescription("");
    setPricing("100% Free");
    setTagsInput("Remote, Tech, Careers");
    setFeatures(["Direct candidate screening", "Verified remote positions"]);
    setSubmitterEmail("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="submit-page" id="submit-page">
      {/* Compact Page Header with Title and Right-Side Stats */}
      <div className="submit-page__hero">
        <div className="container submit-page__hero-inner">
          <div className="submit-page__title-row">
            <h1 className="submit-page__title">
              Submit a <span className="gradient-text">New Platform</span>
            </h1>
            <span className="submit-page__stats-subtitle">
              <strong>Community Curation</strong> &bull; <strong>100% Free</strong> Directory Listing
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        {status === "success" ? (
          /* Success Screen */
          <div className="submit-success-card">
            <div className="submit-success__icon-wrap">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="submit-success__title">
              Submission Received for {previewTool.name}!
            </h2>

            <p className="submit-success__desc">
              Thank you for contributing to the JobStack community. Your
              suggested platform has been queued for editorial review and
              testing according to our curation standards.
            </p>

            <div className="submit-success__summary">
              <div className="submit-success__summary-row">
                <span>Platform</span>
                <span>{previewTool.name}</span>
              </div>
              <div className="submit-success__summary-row">
                <span>Target Category</span>
                <span>{previewTool.category}</span>
              </div>
              <div className="submit-success__summary-row">
                <span>Pricing Model</span>
                <span>{previewTool.pricing}</span>
              </div>
              <div className="submit-success__summary-row">
                <span>Official URL</span>
                <span>{previewTool.url}</span>
              </div>
            </div>

            <div className="submit-success__actions">
              <button
                type="button"
                className="submit-success__btn--primary"
                onClick={onNavigateToTools}
              >
                <span>Browse Directory</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="submit-success__btn--secondary"
                onClick={handleReset}
              >
                <span>Submit Another Platform</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form & Live Preview Layout */
          <div className="submit-page__layout">
            {/* Left: Input Form */}
            <form className="submit-form-card" onSubmit={handleSubmit} noValidate>
              <h2 className="submit-form__section-title">
                <Globe size={18} className="gradient-text" />
                <span>Platform Details</span>
              </h2>

              <div className="submit-form__grid-2">
                {/* Platform Name */}
                <div className="submit-form__field">
                  <label className="submit-form__label" htmlFor="field-name">
                    <span>
                      Platform Name<span className="required">*</span>
                    </span>
                  </label>
                  <div className="submit-form__input-wrap">
                    <Globe size={15} className="submit-form__input-icon" />
                    <input
                      id="field-name"
                      type="text"
                      className={`submit-form__input ${
                        errors.name ? "submit-form__input--error" : ""
                      }`}
                      placeholder="e.g. Wellfound, Arc.dev, Contra"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                    />
                  </div>
                  {errors.name && (
                    <span className="submit-form__error-msg">{errors.name}</span>
                  )}
                </div>

                {/* Website URL */}
                <div className="submit-form__field">
                  <label className="submit-form__label" htmlFor="field-url">
                    <span>
                      Website URL<span className="required">*</span>
                    </span>
                  </label>
                  <div className="submit-form__input-wrap">
                    <Globe size={15} className="submit-form__input-icon" />
                    <input
                      id="field-url"
                      type="url"
                      className={`submit-form__input ${
                        errors.url ? "submit-form__input--error" : ""
                      }`}
                      placeholder="https://..."
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (errors.url) setErrors({ ...errors, url: "" });
                      }}
                    />
                  </div>
                  {errors.url && (
                    <span className="submit-form__error-msg">{errors.url}</span>
                  )}
                </div>
              </div>

              {/* Category Selector */}
              <div className="submit-form__field">
                <label className="submit-form__label">
                  <span>
                    Category<span className="required">*</span>
                  </span>
                  <span className="hint">Choose best fit</span>
                </label>
                <div className="submit-form__cat-pills">
                  {availableCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      className={`submit-form__cat-pill ${
                        category === cat ? "active" : ""
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      <Layers size={13} />
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div className="submit-form__field">
                <label className="submit-form__label" htmlFor="field-tagline">
                  <span>
                    One-Line Pitch / Tagline<span className="required">*</span>
                  </span>
                  <span className="hint">Max 60 chars</span>
                </label>
                <input
                  id="field-tagline"
                  type="text"
                  className={`submit-form__input ${
                    errors.tagline ? "submit-form__input--error" : ""
                  }`}
                  placeholder="e.g. World's #1 premier marketplace for vetted tech contractors"
                  value={tagline}
                  maxLength={75}
                  onChange={(e) => {
                    setTagline(e.target.value);
                    if (errors.tagline) setErrors({ ...errors, tagline: "" });
                  }}
                  style={{ paddingLeft: 14 }}
                />
                {errors.tagline && (
                  <span className="submit-form__error-msg">
                    {errors.tagline}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="submit-form__field">
                <label className="submit-form__label" htmlFor="field-desc">
                  <span>
                    Full Overview & Value Proposition
                    <span className="required">*</span>
                  </span>
                </label>
                <textarea
                  id="field-desc"
                  className={`submit-form__textarea ${
                    errors.description ? "submit-form__textarea--error" : ""
                  }`}
                  placeholder="Describe who uses this tool, what makes it stand out, verified track record, and how it accelerates career success."
                  value={description}
                  rows={3}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description)
                      setErrors({ ...errors, description: "" });
                  }}
                />
                {errors.description && (
                  <span className="submit-form__error-msg">
                    {errors.description}
                  </span>
                )}
              </div>

              {/* Pricing & Tags Grid */}
              <div className="submit-form__grid-2">
                <div className="submit-form__field">
                  <label className="submit-form__label" htmlFor="field-pricing">
                    <span>
                      Pricing Model<span className="required">*</span>
                    </span>
                  </label>
                  <div className="submit-form__input-wrap">
                    <DollarSign size={15} className="submit-form__input-icon" />
                    <input
                      id="field-pricing"
                      type="text"
                      className={`submit-form__input ${
                        errors.pricing ? "submit-form__input--error" : ""
                      }`}
                      placeholder="e.g. 100% Free, Free + Commission"
                      value={pricing}
                      onChange={(e) => {
                        setPricing(e.target.value);
                        if (errors.pricing) setErrors({ ...errors, pricing: "" });
                      }}
                    />
                  </div>
                  {errors.pricing && (
                    <span className="submit-form__error-msg">
                      {errors.pricing}
                    </span>
                  )}
                </div>

                <div className="submit-form__field">
                  <label className="submit-form__label" htmlFor="field-tags">
                    <span>Tags / Focus Areas</span>
                    <span className="hint">Comma-separated</span>
                  </label>
                  <div className="submit-form__input-wrap">
                    <Tag size={15} className="submit-form__input-icon" />
                    <input
                      id="field-tags"
                      type="text"
                      className="submit-form__input"
                      placeholder="Remote, Startups, Web3, Design"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Key Features Bullets */}
              <div className="submit-form__field">
                <label className="submit-form__label">
                  <span>Key Standout Features</span>
                  <span className="hint">Up to 4 bullet points</span>
                </label>
                <div className="submit-form__features-wrap">
                  {features.map((feat, idx) => (
                    <div key={idx} className="submit-form__feature-row">
                      <input
                        type="text"
                        className="submit-form__feature-input"
                        placeholder={`Feature highlight #${idx + 1}`}
                        value={feat}
                        onChange={(e) =>
                          handleUpdateFeature(idx, e.target.value)
                        }
                      />
                      {features.length > 1 && (
                        <button
                          type="button"
                          className="submit-form__feature-remove-btn"
                          onClick={() => handleRemoveFeature(idx)}
                          title="Remove feature"
                          aria-label={`Remove feature ${idx + 1}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}

                  {features.length < 4 && (
                    <button
                      type="button"
                      className="submit-form__feature-add-btn"
                      onClick={handleAddFeature}
                    >
                      <Plus size={13} />
                      <span>Add another capability</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submitter Email */}
              <div className="submit-form__field">
                <label className="submit-form__label" htmlFor="field-email">
                  <span>Your Contact Email</span>
                  <span className="hint">Optional (for status updates)</span>
                </label>
                <input
                  id="field-email"
                  type="email"
                  className="submit-form__input"
                  placeholder="name@company.com"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  style={{ paddingLeft: 14 }}
                />
              </div>

              {/* Form Submit Button */}
              <div className="submit-form__actions">
                <button
                  type="submit"
                  className="submit-form__submit-btn"
                  disabled={status === "submitting"}
                >
                  <Send size={15} />
                  <span>
                    {status === "submitting"
                      ? "Submitting..."
                      : "Submit Platform for Review"}
                  </span>
                </button>
              </div>
            </form>

            {/* Right: Real-Time Live Card Preview */}
            <aside className="submit-page__preview-wrap">
              <div className="submit-page__preview-header">
                <div className="submit-page__preview-badge">
                  <Eye size={14} />
                  <span>Live Directory Preview</span>
                </div>
                <span className="submit-page__preview-hint">
                  Updates in real time
                </span>
              </div>

              <div className="submit-page__preview-card-container">
                <ToolCard tool={previewTool} index={0} />
              </div>

              {/* Curation Criteria Helper Card */}
              <div className="submit-page__guidelines-card">
                <h3 className="submit-page__guidelines-title">
                  <Check size={16} />
                  <span>Curation Quality Checklist</span>
                </h3>
                <ul className="submit-page__guidelines-list">
                  <li className="submit-page__guidelines-item">
                    <Check size={14} />
                    <span>
                      Must have verified active listings or clients within the
                      past 30 days.
                    </span>
                  </li>
                  <li className="submit-page__guidelines-item">
                    <Check size={14} />
                    <span>
                      Transparent compensation and scam-free candidate
                      protection.
                    </span>
                  </li>
                  <li className="submit-page__guidelines-item">
                    <Check size={14} />
                    <span>
                      Clean user experience with minimal intrusive popups or
                      paywalls.
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitToolPage;

