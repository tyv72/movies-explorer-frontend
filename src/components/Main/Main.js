import './Main.css';
import MainSection from './MainSection/MainSection.js';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import NavTab from './NavTab/NavTab.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';

function Main(props) {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <MainSection backgroundColor="dark" headerText="О проекте">
        <AboutProject />
      </MainSection>
      <MainSection backgroundColor="gray" headerText="Технологии">
        <Techs />
      </MainSection>           
      <MainSection backgroundColor="dark" headerText="Студент">
        <AboutMe />
        <Portfolio />
      </MainSection>      
    </main>
  );
}

export default Main;