# Report: To-Do List Application

## 1. Directory Structure

The project is organized as follows:

```text
todo-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── README.md
└── REPORT.md
```

- index.html contains the semantic structure of the application.
- css/style.css defines the responsive layout, visual design, and accessibility styling.
- js/script.js contains the application logic, state management, and DOM updates.
- README.md provides a concise overview and usage instructions.
- REPORT.md documents the implementation and verification process.

## 2. Application Overview

This project is a modern To-Do List application built using HTML5, CSS3, and Vanilla JavaScript. The application enables users to create, view, update, complete, and delete tasks in a clean and interactive interface. It is designed to be simple to use while demonstrating core front-end development concepts such as state management, persistence, dynamic rendering, and responsive design.

The application includes a task input form, task filtering controls, a task counter, and a clear-completed action. The interface follows a mobile-first design approach and incorporates modern styling features such as glassmorphism, gradient buttons, smooth transitions, and hover effects.

## 3. CRUD Implementation

The application supports the full CRUD workflow:

- Create: Users can add a new task through a form input and submit button.
- Read: Existing tasks are displayed dynamically in a list.
- Update: Each task can be edited inline through a dedicated editing interface.
- Delete: Tasks can be removed individually or through the clear-completed option.

The implementation is handled through JavaScript functions that manage task operations and update the user interface accordingly.

## 4. State Management using JavaScript Arrays

Application state is maintained using a JavaScript array stored in an object-based state structure. Each task object contains the following properties:

- id: a unique identifier for each task
- title: the task description entered by the user
- completed: a Boolean value indicating whether the task is complete

This approach keeps the data model simple and predictable. State updates are performed by mapping, filtering, and unshifting array operations, which ensures that the interface remains synchronized with the current data.

## 5. LocalStorage Persistence

To preserve user data across page reloads, the application uses the browser's LocalStorage API. After any change to the task list, the updated array is serialized to JSON and stored locally. On page load, the saved data is restored and displayed automatically.

This persistence mechanism improves usability by retaining tasks between sessions without requiring a backend service.

## 6. Dynamic DOM Manipulation

The user interface is generated dynamically using JavaScript rather than hardcoded HTML for tasks. Each task is created and inserted into the DOM at runtime based on the current application state. This makes the application more maintainable and ensures that the rendered list always reflects the latest data.

DOM updates are performed whenever tasks are added, edited, completed, deleted, or filtered.

## 7. Event Delegation

Event delegation is implemented to handle interactions efficiently. Instead of attaching individual event listeners to every task button, a single click listener is attached to the task list container. This listener identifies the target action and responds appropriately for:

- completing a task
- editing a task
- deleting a task

This design reduces code duplication and improves scalability for larger task lists.

## 8. Filtering System (All, Active, Completed)

The application includes a filtering system with three options:

- All: displays every task
- Active: displays only incomplete tasks
- Completed: displays only completed tasks

The current filter is stored in the application state and applied when rendering the task list. This provides users with a structured way to view and manage tasks based on status.

## 9. Accessibility Features

Accessibility was considered throughout the implementation. The application includes:

- semantic HTML5 elements such as header, main, section, and footer
- descriptive labels for form inputs
- keyboard-accessible buttons and input controls
- visible focus states for interactive elements
- ARIA attributes such as live regions and button state announcements

These features help improve usability for keyboard and assistive technology users.

## 10. Responsive Design

The application follows a mobile-first responsive design approach. The layout uses Flexbox and CSS Grid to create a clean, adaptable interface across different screen sizes. The design adjusts the arrangement of content on larger screens while maintaining usability on smaller mobile devices.

The styling also incorporates CSS variables, gradient buttons, glassmorphism effects, and smooth animations to create a modern user experience.pu

## 11. Verification & Testing

The application was manually tested in a local browser environment to verify:

- Task creation
- Task editing
- Task deletion
- Task completion
- Filter functionality (All, Active, Completed)
- LocalStorage persistence after page reload
- Responsive layout across multiple viewport sizes

No unsupported or fabricated testing results are included in this report.

## 12. Conclusion

The To-Do List application successfully demonstrates the integration of core front-end development concepts in a practical project. It combines CRUD functionality, state management, local persistence, dynamic rendering, event delegation, filtering, accessibility, and responsive design in a single cohesive web application.

Overall, the project provides a strong foundation for further extension, including features such as drag-and-drop ordering, due dates, categories, or integration with a backend service.
