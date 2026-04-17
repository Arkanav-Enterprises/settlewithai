#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Content Generation Pipeline for Settle AI
# Usage: ./scripts/generate-content.sh <type> <slug> [--draft-only]
#
# Types: comparison, industry, blog
# Example: ./scripts/generate-content.sh comparison erp-vendors
#          ./scripts/generate-content.sh industry hospitality
#          ./scripts/generate-content.sh blog ai-deployment-timeline --draft-only
# ─────────────────────────────────────────────────────────────

set -euo pipefail

TYPE="${1:-}"
SLUG="${2:-}"
DRAFT_ONLY="${3:-}"

if [[ -z "$TYPE" || -z "$SLUG" ]]; then
  echo "Usage: ./scripts/generate-content.sh <type> <slug> [--draft-only]"
  echo ""
  echo "Types:"
  echo "  comparison   - /compare/{slug} page (e.g., erp-vendors)"
  echo "  industry     - /ai-consulting-for/{slug} page (e.g., hospitality)"
  echo "  blog         - /blog/{slug} post"
  echo ""
  echo "Options:"
  echo "  --draft-only - Generate draft without review/revision"
  exit 1
fi

# ─── Paths ───
CONTENT_DIR="src/content"
case "$TYPE" in
  comparison) OUTPUT_DIR="$CONTENT_DIR/comparisons" ;;
  industry)   OUTPUT_DIR="$CONTENT_DIR/industries" ;;
  blog)       OUTPUT_DIR="$CONTENT_DIR/blog" ;;
  *) echo "Error: Unknown type '$TYPE'. Use: comparison, industry, blog"; exit 1 ;;
esac

OUTPUT_FILE="$OUTPUT_DIR/$SLUG.mdx"

if [[ -f "$OUTPUT_FILE" ]]; then
  echo "Error: $OUTPUT_FILE already exists. Delete it first or use a different slug."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# ─── Templates ───

COMPARISON_PROMPT="Write a comparison page for settlewithai.com: 'Settle vs $SLUG'.

Settle is a full-stack AI agency that deploys Claude (Anthropic's AI) into businesses. First client Orient Printing: 85% faster doc generation, 49 use cases mapped, 11 projects deployed, 4hrs to 30min task time.

Write an MDX file with YAML frontmatter (title, description, slug, competitor, date, keywords, faq array) followed by ~2,800 words of content.

Structure:
1. Quick verdict blockquote
2. Comparison table (6-8 dimensions)
3. Deep-dive sections comparing the approaches
4. Cost comparison
5. Who should choose each option
6. FAQ (6 questions as H3/paragraph pairs)
7. Conclusion

Voice: understated, warm, 'we' for Settle. No exclamation marks, no emojis. Include Orient data where relevant."

INDUSTRY_PROMPT="Write an industry page for settlewithai.com: 'AI Consulting for $SLUG'.

Settle deploys Claude (Anthropic's AI) into businesses. Orient Printing case study: 85% faster doc generation, 49 use cases, 11 projects, 4hrs to 30min.

Write an MDX file with YAML frontmatter (title, description, slug, industry, date, keywords, heroStat, faq array) followed by ~2,800 words.

Structure:
1. Industry problem hook with stat
2. Why this industry needs AI consulting
3. 5 specific Claude use cases with workflow examples
4. Business case / ROI metrics
5. How Settle deploys for this industry
6. FAQ (6 questions)

Voice: understated, warm, 'we' for Settle. No exclamation marks, no emojis."

BLOG_PROMPT="Write a blog post for settlewithai.com about: $SLUG.

Settle deploys Claude (Anthropic's AI) into businesses. Orient Printing case study: 85% faster doc generation, 49 use cases, 11 projects.

Write an MDX file with YAML frontmatter (title, description, slug, date, category, keywords, published: true) followed by ~2,000-3,000 words.

Voice: educational, practical, 'we' for Settle where relevant. No exclamation marks, no emojis."

case "$TYPE" in
  comparison) DRAFT_PROMPT="$COMPARISON_PROMPT" ;;
  industry)   DRAFT_PROMPT="$INDUSTRY_PROMPT" ;;
  blog)       DRAFT_PROMPT="$BLOG_PROMPT" ;;
esac

# ─── Stage 1: Draft ───
echo "📝 Stage 1/3: Drafting $TYPE page for '$SLUG'..."
DRAFT_START=$(date +%s)

claude --print "$DRAFT_PROMPT

Write ONLY the MDX file content (frontmatter + markdown body). No explanations." > "$OUTPUT_FILE"

DRAFT_END=$(date +%s)
DRAFT_TIME=$((DRAFT_END - DRAFT_START))
WORD_COUNT=$(wc -w < "$OUTPUT_FILE" | tr -d ' ')
echo "   Draft complete: ${WORD_COUNT} words in ${DRAFT_TIME}s"

if [[ "$DRAFT_ONLY" == "--draft-only" ]]; then
  echo ""
  echo "✅ Draft saved to $OUTPUT_FILE"
  echo "   Skipping review and revision (--draft-only flag)."
  exit 0
fi

# ─── Stage 2: Review ───
echo ""
echo "🔍 Stage 2/3: Reviewing draft..."
REVIEW_START=$(date +%s)

REVIEW=$(claude --print "Review this MDX content for SEO quality. Score each dimension 1-10:

1. Keyword optimization (primary keyword in title, H1, first paragraph, 5-8 mentions)
2. Content depth (comprehensive coverage, not surface-level)
3. Structure (proper H2/H3 hierarchy, logical flow)
4. Factual accuracy (no fabricated stats, uses 'typically' for estimates)
5. Tone (understated, warm, professional — no hype)
6. FAQ quality (specific, helpful answers)
7. CTA presence (clear next step for the reader)

Overall verdict: PASS (avg 7+), REVISE (avg 5-7), or REJECT (avg <5).

If REVISE, list the specific sections that need improvement and what to fix.

Content to review:
$(cat "$OUTPUT_FILE")")

REVIEW_END=$(date +%s)
REVIEW_TIME=$((REVIEW_END - REVIEW_START))
echo "   Review complete in ${REVIEW_TIME}s"
echo ""
echo "$REVIEW" | head -30
echo ""

# ─── Stage 3: Revise (if needed) ───
if echo "$REVIEW" | grep -qi "REVISE"; then
  echo "🔧 Stage 3/3: Revising based on review feedback..."
  REVISE_START=$(date +%s)

  claude --print "Revise this MDX content based on the review feedback below. Output the complete revised MDX file (frontmatter + body). No explanations.

REVIEW FEEDBACK:
$REVIEW

ORIGINAL CONTENT:
$(cat "$OUTPUT_FILE")" > "$OUTPUT_FILE"

  REVISE_END=$(date +%s)
  REVISE_TIME=$((REVISE_END - REVISE_START))
  FINAL_WORDS=$(wc -w < "$OUTPUT_FILE" | tr -d ' ')
  echo "   Revision complete: ${FINAL_WORDS} words in ${REVISE_TIME}s"
else
  echo "✨ Stage 3/3: Skipped — review passed."
fi

echo ""
echo "✅ Content saved to $OUTPUT_FILE"
echo "   Total time: $(($(date +%s) - DRAFT_START))s"
echo ""
echo "Next steps:"
echo "  1. Review the file: cat $OUTPUT_FILE"
echo "  2. Add to footer: src/components/layout/Footer.tsx"
echo "  3. Add to sitemap: src/app/sitemap.ts"
echo "  4. Build: npm run build"
