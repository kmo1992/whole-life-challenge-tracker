
# Whole Life Challenge Tracker

A React application to track your progress during the Whole Life Challenge. The app allows you to log daily practices, track nutrition points, and visualize your progress through weekly and entire challenge graphs.

## Features

- **Daily Tracking**: Log your daily practices including Nutrition, Exercise, Mobility, Sleep, Water, Well-being, and Reflection.
- **Weekly Navigation**: Navigate between weeks to view and update your progress.
- **Mobility Practices and Workouts**: View assigned mobility practices and workouts based on the date.
- **Data Persistence**: Your progress is saved locally in your browser's local storage.
- **Progress Visualization**: View your progress through interactive charts for both weekly and entire challenge periods.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: As the build tool and development server.
- **Chart.js** and **react-chartjs-2**: For rendering interactive charts.
- **Moment.js**: For date manipulation.
- **React Icons**: For displaying icons.
- **CSS**: For styling the application.

## Getting Started

### Prerequisites

- **Node.js** (version 12 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/whole-life-challenge-tracker.git
   cd whole-life-challenge-tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
├── src
│   ├── components
│   │   ├── App.jsx
│   │   ├── WeekView.jsx
│   │   ├── DayCard.jsx
│   │   ├── PracticeItem.jsx
│   │   ├── MobilitySection.jsx
│   │   ├── NavigationButtons.jsx
│   │   ├── IconKey.jsx
│   │   ├── WeeklyChart.jsx
│   │   └── EntireChallengeChart.jsx
│   ├── data
│   │   ├── practices.js
│   │   └── practicesData.js
│   ├── utils
│   │   ├── dateUtils.js
│   │   └── practiceUtils.js
│   ├── App.css
│   └── main.jsx
├── public
│   └── index.html
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [yourusername](https://github.com/yourusername)

---

## Acknowledgments

- Inspired by the Whole Life Challenge.
- Thanks to all the open-source projects that made this possible.



