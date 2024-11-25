import React, { useState } from 'react';
 const App = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const filteredCourses = coursesData.filter(course =>
 course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
 );
 return (
 <div>
 <h1>Liste des Cours</h1>
 <input
 type="text"
 placeholder="Rechercher un cours..."
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 <ul>
 {filteredCourses.map((course, index) => (
 <li key={index}>{course.courseName}</li>
 ))}