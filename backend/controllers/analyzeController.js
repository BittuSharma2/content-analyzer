export function analyzeText(req, res, next) {
    try {
      const { text = "" } = req.body;
  
      if (!text.trim()) {
        throw { statusCode: 400, message: "No text provided" };
      }
  
      const trimmed = text.trim();
      const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  
      const sentences = trimmed
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter(Boolean);
  
      const sentenceCount = sentences.length || 1;
      const avgWordsPerSentence = +(wordCount / sentenceCount).toFixed(1);
  
      const hasCTA = /\b(call to action|click|buy|register|sign up|contact)\b/i.test(trimmed);
  
      const hashtags = trimmed.match(/#\w+/g) || [];
      const emojis = trimmed.match(/([\u231A-\uD83E\uDDFF])/g) || [];
  
      const suggestions = [];
  
      if (!hasCTA) suggestions.push("- Add a clear CTA.");
      else suggestions.push("- Good: CTA found.");
  
      if (wordCount < 10) suggestions.push("- Add more details.");
      else if (wordCount > 120) suggestions.push("- Post is too long.");
      else suggestions.push("- Word count is good.");
  
      if (hashtags.length === 0) suggestions.push("- Add hashtags.");
      else suggestions.push(`- Hashtags: ${hashtags.length}`);
  
      if (emojis.length === 0) suggestions.push("- Add emojis.");
      else suggestions.push(`- Emojis: ${emojis.length}`);
  
      if (avgWordsPerSentence > 20)
        suggestions.push(`- Sentences long (avg ${avgWordsPerSentence}).`);
      else suggestions.push("- Readability is good.");
  
      const resultLines = [
        "--- Summary ---",
        `Words: ${wordCount}`,
        `Sentences: ${sentenceCount}`,
        `Avg words/sentence: ${avgWordsPerSentence}`,
        "",
        "--- Suggestions ---",
        ...suggestions,
      ];
  
      res.json({ success: true, result: resultLines.join("\n") });
  
    } catch (err) {
      next(err);
    }
  }
  