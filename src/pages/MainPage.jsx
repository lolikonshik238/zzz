import Header from "../components/Header";
import stroitel from "../assets/images/guy.jpg";
import flower from "../assets/images/flower.png"


function MainPage() {
    return (
        <>
            <Header />
            <div className="Main">
                <div className="text-in">
                    <p className="text">Comprehensive approach,<br /> guaranteed results.</p>
                </div>

                    <div className="stroitel-banner">
                        <div className="main-banner-text">
                            <img src={stroitel} alt="" className="image-stroitel"/>
                            <p className="text-suka"> Купите 1 боба строителя по цене 2-ух</p>
                            <p className="text-suka2"> Только до 20 апреля!</p>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default MainPage;