import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { updateQuiz } from '../services/quizService';

export default function EditQuizScreen({ navigation, route }) {
  const { quiz } = route.params;
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description || '');
  const [questions, setQuestions] = useState(quiz.questions || []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        timeLimit: 20,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a quiz title');
      return;
    }

    if (questions.length === 0) {
      Alert.alert('Error', 'Please add at least one question');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        Alert.alert('Error', `Question ${i + 1} is empty`);
        return;
      }
      const emptyOptions = q.options.filter((opt) => !opt.trim());
      if (emptyOptions.length > 0) {
        Alert.alert('Error', `Question ${i + 1} has empty options`);
        return;
      }
    }

    const updates = {
      title: title.trim(),
      description: description.trim(),
      questions,
    };

    const result = await updateQuiz(quiz.id, updates);
    if (result.success) {
      Alert.alert('Success', 'Quiz updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>Quiz Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter quiz title"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter quiz description"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Questions</Text>
            <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
              <Text style={styles.addButtonText}>+ Add Question</Text>
            </TouchableOpacity>
          </View>

          {questions.map((question, qIndex) => (
            <View key={qIndex} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>Question {qIndex + 1}</Text>
                <TouchableOpacity onPress={() => removeQuestion(qIndex)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                value={question.question}
                onChangeText={(text) => updateQuestion(qIndex, 'question', text)}
                placeholder="Enter question"
              />

              <Text style={styles.optionsLabel}>Answer Options:</Text>
              {question.options.map((option, oIndex) => (
                <View key={oIndex} style={styles.optionRow}>
                  <TouchableOpacity
                    style={[
                      styles.radio,
                      question.correctAnswer === oIndex && styles.radioSelected,
                    ]}
                    onPress={() =>
                      updateQuestion(qIndex, 'correctAnswer', oIndex)
                    }
                  >
                    {question.correctAnswer === oIndex && (
                      <View style={styles.radioInner} />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.input, styles.optionInput]}
                    value={option}
                    onChangeText={(text) => updateOption(qIndex, oIndex, text)}
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </View>
              ))}

              <Text style={styles.timeLimitLabel}>
                Time Limit: {question.timeLimit}s
              </Text>
              <View style={styles.timeButtonRow}>
                {[10, 20, 30, 45, 60].map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      question.timeLimit === time && styles.timeButtonSelected,
                    ]}
                    onPress={() => updateQuestion(qIndex, 'timeLimit', time)}
                  >
                    <Text
                      style={[
                        styles.timeButtonText,
                        question.timeLimit === time &&
                          styles.timeButtonTextSelected,
                      ]}
                    >
                      {time}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  removeText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
  optionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#4caf50',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
  },
  optionInput: {
    flex: 1,
  },
  timeLimitLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
  },
  timeButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  timeButtonText: {
    fontSize: 12,
    color: '#666',
  },
  timeButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
