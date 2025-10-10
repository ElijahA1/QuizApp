import './Home.css';
import linkedinLogo from '../../Assets/images/linkedin.png'
import githubLogo from '../../Assets/images/github.png'
//import FullScreenFade from '../../Components/FullScreenSection/FullScreenSection';

function Home() {
  return (
    <div className="Home">
        <div className="ContentHeader">
            <div className='HeaderLinks'>
                <div id='About'>About</div>
                <div id = 'Developers'>Developers</div>
                <div id='LearnIt'>LearnIT!</div>
            </div>
            <h1>Welcome</h1>
            <div id='Title'>QuizIT! C#</div>
        </div>
        <div className='About'>
            <h1>About QuizIT! C#</h1>
            <p>QuizIt! C# is a collaborative project built by a small team of four passionate developers, united by a shared goal: to learn the full lifecycle of building modern web applications — from frontend design to backend architecture.</p>
            <p>Our mission is simple yet powerful: to help fellow C# and .NET developers grow, learn, and confidently prepare for technical interviews. Whether you're just starting out or brushing up on object-oriented programming, QuizIt! C# offers a focused, practical way to sharpen your skills.</p>
            <p>With over 90 carefully curated questions covering C#, .NET fundamentals, and OOP concepts, QuizIt is designed to challenge your understanding and get you interview-ready.</p>
        </div>
        <div className='Contributors'>
            <div id='TeamTitle'>Meet the development team</div>
            <div className='Team'>
                <div className='Left'>
                    <h1>Frontend</h1>
                       <div className='Names'>
                       <div className='Developer'>
                           <h1>Jerome</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/jeromecagado/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/jeromecagado'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                       <div className='Developer'>
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
                <div className='Right'>
                    <h1>Backend</h1>
                    <div className='Names'>
                       <div className='Developer'>
                           <h1>Ryan</h1>
                           <div>
                               <a href='https://www.linkedin.com/in/ryankinison/'>
                               <img src={linkedinLogo} alt="LinkedIn"/></a>
                               <a href='https://github.com/o11o01'>
                               <img src={githubLogo} alt="GitHub"/></a>
                           </div>
                       </div>
                       <div className='Developer'>
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
        <div className='TechStack'></div>
        <footer>This is the footer</footer>
    </div>
  );
}

export default Home;