# YooChat - Connect, Chat, Learn!  🚀
<p align="center">
  <img src="https://github.com/hamzadevlpr/chat-app-mern-stack/assets/99534215/f12b58ee-688a-4cf5-999a-040289ffd9a7" alt="YooChat Logo" width="400"/>
</p>

YooChat is a modern and intuitive chat application designed to facilitate seamless communication and collaboration among users. Whether you're a student looking to connect with classmates, a professional seeking a platform for team communication, or anyone eager to chat with friends, YooChat has you covered.

## Features

- [x] - <span style="color: #007BFF;">**User** **Authentication**: Securely sign up and log in to YooChat to access personalized features and ensure a safe and private chatting experience.

### **⇒ Sign Up**:
* Collect essential user information during the sign-up process, such as email address and password.
* Implement password strength requirements to enhance security.
* Verify email addresses to ensure they are valid and unique.
* Provide clear feedback on successful sign-up and notify users if there are any issues.

### **⇒ Login**:
* Use secure and encrypted protocols (e.g., HTTPS) for transmitting login credentials.
* Implement account lockout mechanisms to prevent brute-force attacks.
* Consider implementing multi-factor authentication (MFA) for an additional layer of security.
* Provide informative error messages to help users troubleshoot login issues.

### **⇒ Reset Password:**
* Offer a "Forgot Password" or "Reset Password" functionality on the login page.
* Authenticate the user's identity through a secondary method (e.g., email verification).
* Generate and send a unique, time-limited reset link to the user's registered email address.
* Include security features such as CAPTCHA to prevent automated attacks on the reset process.

### **⇒ New Password:**
* Set minimum password length and complexity requirements.
* Encourage users to create unique passwords and avoid commonly used ones.
* Use strong encryption algorithms to store and transmit passwords securely.
* Prompt users to confirm their new password to avoid input errors.

### **⇒ Link Sent to Email:**
* Ensure that reset and confirmation links are unique to each user and expire after a set period.
* Clearly communicate the purpose of the email and the action the user needs to take.
* Include a mechanism to resend the email in case users do not receive it.
* Implement email validation to protect against email spoofing and phishing attacks.

### **⇒ Security Best Practices:**
* Regularly update and patch the authentication system to address security vulnerabilities.
* Monitor and log authentication events for security auditing.
* Educate users about best practices for securing their accounts, such as avoiding public computers for logins.

### **⇒ User Experience:**
* Design a user-friendly interface for all authentication processes.
* Provide clear instructions and feedback throughout the sign-up, login, and password management processes.
* Balance security measures with user convenience to encourage compliance.

- [x] - **User** **Profiles**: Create and customize your profile to showcase your personality. Add a profile picture, update your status, and let others know a bit about you.

- [ ] **Real-time** **Messaging**: Engage in real-time conversations with friends and colleagues. YooChat provides a fast and responsive messaging experience, making it easy to stay connected.

- [ ] **Group** **Chats**: Create or join group chats to bring people together around common interests or projects. Collaborate with ease and keep everyone in the loop.

- [ ] **Multimedia** **Support**: Share images, videos, and documents seamlessly within the chat. Express yourself with multimedia content to enhance your communication.

- [ ] **Responsive** **Design**: YooChat is designed to work flawlessly on desktops, tablets, and smartphones, ensuring a consistent user experience across devices.

## Tech Stack
YooChat is built using the MERN stack (MongoDB, Express.js, React, Node.js) to provide a robust and scalable foundation for the application.

* **MongoDB**: A NoSQL database for storing user data, chat history, and other relevant information.

* **Express.js**: A backend framework for building a secure and efficient server.

* **React**: A frontend library for building a dynamic and interactive user interface.

* **Node.js**: A JavaScript runtime for running the server-side logic and handling requests.

* **Socket.io**: Implements real-time, bidirectional communication for instant messaging and notifications.

# Getting Started
To run YooChat locally, follow these steps:

* Clone the repository:
```
git clone https://github.com/your-username/YooChat.git
```
* Navigate to the project directory: 
```
cd YooChat
```
* Install dependencies for both the client and server: 
```
npm run install-all
```
* Set up your MongoDB database and update the connection string in the server's .env file.
Start the application: 
```
npm run dev
```
### Contribution Guidelines
We welcome contributions to make YooChat even better! If you have any ideas, bug fixes, or new features to propose, please check out our contribution guidelines.

## Future Plans
YooChat is an ongoing project, and we have exciting plans for its future development. Stay tuned for updates as we continue to enhance the application with new features and improvements.

## Screenshots 📸

# Login Screens

| Login | Signup |
|---------|---------|
| ![image1](https://github.com/hamzadevlpr/chat-app-mern-stack/assets/99534215/32a4ff3d-88e3-488a-adce-037e1e39c19a) | ![image2](https://github.com/hamzadevlpr/chat-app-mern-stack/assets/99534215/15f90b7d-bd89-4db6-b076-05e51c26701c) |

| Reset Password | New Password |
|---------|---------|
| ![image3](https://github.com/hamzadevlpr/chat-app-mern-stack/assets/99534215/3ab82310-b8ef-41c3-aacd-5ab948cb01cf) | ![image4](https://github.com/hamzadevlpr/chat-app-mern-stack/assets/99534215/1931e5de-bbb5-4353-9b3a-b07b33f8a7e2) |




## Contributing 🤝
We welcome contributions! Please follow our contribution guidelines.

## License 📝
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments 🙌
Thanks to OpenAI for amazing language models like GPT-3.
Feel free to reach out to us with any questions or feedback!

## Happy coding! 🚀✨

Connect, chat, and learn with YooChat! We're excited to have you on board. If you encounter any issues or have suggestions for improvement, 
please don't hesitate to open an issue. Happy chatting!
