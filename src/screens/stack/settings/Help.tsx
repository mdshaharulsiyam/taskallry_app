import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import { useGetFaqQuery } from "../../../redux/apis";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Help = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data } = useGetFaqQuery();
  const faqs = data?.data || [];

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaProviderNoScroll backButtonText="Help / Support">
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggleExpand(faq.id)}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.arrow}>
                {expandedId === faq.id ? "▲" : "▶"}
              </Text>
            </TouchableOpacity>
            {expandedId === faq.id && (
              <View style={styles.faqAnswerBox}>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Need More Help?
        </Text>
        <View style={styles.helpBox}>
          <Text style={styles.helpText}>
            📧 Mail Us: <Text style={styles.mail}>support@taskalley.com</Text>
          </Text>
          <Text style={styles.helpLine}>
            Our help line service is active: 24/7
          </Text>
        </View>
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#E6F4F1",
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  faqQuestion: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  arrow: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  faqAnswerBox: {
    borderTopWidth: 0.3,
    borderColor: "#000",
    padding: 12,
    backgroundColor: "#E6F4F1",
  },
  faqAnswer: {
    fontSize: 13,
    color: "#555",
  },
  helpBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f0f7f7",
  },
  helpText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  mail: {
    color: "#007BFF",
  },
  helpLine: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
