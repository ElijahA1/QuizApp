import './Home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import linkedinLogo from '../../Assets/images/linkedin.png'
import githubLogo from '../../Assets/images/github.png'

function Home() {
const navigate = useNavigate();

useEffect(() => {
  const sections = document.querySelectorAll('.Section');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));

  return () => observer.disconnect();
}, []);

  return (
    <div className="Home">
       <div id='HeaderLinks'>
            <div id='AboutLink'><a href="#About">About</a></div>
            <div id ='DevelopersLink'><a href="#Contributors">Developers</a></div>
            <div id='LearnItLink'><a href="/landing">LearnIT!</a></div>
            </div>
        <div id="ContentHeader" className='Section'>
            <h1>Welcome</h1>
            <div id='Title'>QuizIT! C#</div>
        </div>
        <div id='About' className='Section'>
            <h1>About QuizIT! C#</h1>
            <p>QuizIt! C# is a collaborative project built by a small team of four passionate developers, united by a shared goal: to learn the full lifecycle of building modern web applications — from frontend design to backend architecture.</p>
            <p>Our mission is simple yet powerful: to help fellow C# and .NET developers grow, learn, and confidently prepare for technical interviews. Whether you're just starting out or brushing up on object-oriented programming, QuizIt! C# offers a focused, practical way to sharpen your skills.</p>
            <p>With over 90 carefully curated questions covering C#, .NET fundamentals, and OOP concepts, QuizIt! C# is designed to challenge your understanding and get you interview-ready.</p>
        </div>
        <div id='Contributors' className='Section'>
            <div id='TeamTitle'>MEET THE DEVELOPERS</div>
            <div id='Team'>
                <div id='Left'>
                    <h1>Frontend</h1>
                       <div class='DevNames'>
                       <div className='DeveloperBox'>
                           <h1>Jerome</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/jeromecagado/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/jeromecagado'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                       <div className='DeveloperBox'>
                           <h1>Elijah</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/elijahabourezk/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/ElijahA1'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                    </div>
                </div>
                <div id='Right'>
                    <h1>Backend</h1>
                    <div className='DevNames'>
                       <div className='DeveloperBox'>
                           <h1>Ryan</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/ryankinison/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/o11o01'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                       <div className='DeveloperBox'>
                           <h1>Stephen</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/stephenmbeck/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/Stephen-Beck'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className='Section'>
            <button onClick={() => navigate('/landing')}>Try IT Out!</button>
        </footer>
    </div>
  );
}

export default Home;