# AI ChatBot

AI ChatBot is a mobile application developed in React Native that allows users to have conversations with Google's Generative AI (Gemini API).

## Overview

AI ChatBot enables users to send messages, upload images for AI-generated descriptions, and enjoy continuous conversational interactions thanks to the AI's memory capabilities.

## Features

### Conversational AI

- **Send Messages**: Users can input messages and send them to the Gemini API.
- **Receive Responses**: The AI generates conversational responses based on user input.
- **Memory Retention**: The AI remembers previous messages in the chat, enabling a continuous and meaningful conversation.

### Real-time Chat

- **Message Display**: The chat interface displays user messages and AI responses seamlessly.

### Image Understanding

- **Image Upload**: Users can upload images to the AI.
- **AI Image Description**: The AI provides a detailed description of the content in the uploaded images.

### User Profiles

- **Setup Profile**: Users can set up their profile, including their nickname, which personalizes the chat experience.

## Technology Stack

- **Framework**: React Native
- **State Management**: Redux
- **Persistent Storage**: Async Storage
- **API**: Google Gemini API
- **Image Handling**: React Native Image Crop Picker, React Native FS
- **Toast Notifications**: React Native Toast Message
- **Iconography**: React Native Vector Icons

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/usamafayaz/ai-chatbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ai-chatbot
   ```

3. Install React Native packages and dependencies:
   ```bash
   npm install
   ```
4. Setup your Gemini API_KEY

5. Start the React Native frontend:
   ```bash
   npx react-native run-android
   # or
   npm start
   ```

## Contact

For any inquiries, please contact [usama.fayyaz157@gmail.com].
