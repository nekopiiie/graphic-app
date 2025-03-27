import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SortableTable from './components/SortableTable';

const App: React.FC = () => {
  const jujutsuCharacters = [
    { 
      id: 1, 
      name: 'Yuji Itadori', 
      role: 'Main protagonist', 
      technique: 'Divergent Fist',
      grade: 'Grade 1',
      affiliation: 'Tokyo Jujutsu High'
    },
    { 
      id: 2, 
      name: 'Megumi Fushiguro', 
      role: 'Student', 
      technique: 'Ten Shadows Technique',
      grade: 'Grade 2',
      affiliation: 'Tokyo Jujutsu High'
    },
    { 
      id: 3, 
      name: 'Nobara Kugisaki', 
      role: 'Student', 
      technique: 'Straw Doll Technique',
      grade: 'Grade 3',
      affiliation: 'Tokyo Jujutsu High'
    },
    { 
      id: 4, 
      name: 'Satoru Gojo', 
      role: 'Teacher', 
      technique: 'Limitless',
      grade: 'Special Grade',
      affiliation: 'Tokyo Jujutsu High'
    },
    { 
      id: 5, 
      name: 'Suguru Geto', 
      role: 'Former teacher', 
      technique: 'Cursed Spirit Manipulation',
      grade: 'Special Grade',
      affiliation: 'Formerly Tokyo Jujutsu High'
    },
    { 
      id: 6, 
      name: 'Mei Mei', 
      role: 'Sorcerer', 
      technique: 'Black Bird Manipulation',
      grade: 'Grade 1',
      affiliation: 'Tokyo Jujutsu High'
    },
    { 
      id: 7, 
      name: 'Choso', 
      role: 'Death Painting', 
      technique: 'Blood Manipulation',
      grade: 'Special Grade',
      affiliation: 'Independent'
    },
    { 
      id: 8, 
      name: 'Yuki Tsukumo', 
      role: 'Special Grade Sorcerer', 
      technique: 'Star Rage',
      grade: 'Special Grade',
      affiliation: 'Independent'
    },
    { 
      id: 9, 
      name: 'Ryomen Sukuna', 
      role: 'King of Curses', 
      technique: 'Cleave and Dismantle',
      grade: 'Special Grade',
      affiliation: 'Independent'
    }
  ];

  return (
    <div className="container mt-4">
      <SortableTable data={jujutsuCharacters} />
    </div>
  );
};

export default App;