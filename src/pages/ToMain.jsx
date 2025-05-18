import { Link } from "react-router-dom";
import { MAINPAGE } from "../services/consts";



function ToMain(){
    return(
        <div className="to-main">
            <div>
                <p>
                    Ваш заказ был успешно оформлен! <br></br>
                    Ожидайте доставку в течении 120-180 минут
                </p>
                <Link to={MAINPAGE}><button className="checkout-button">Главная</button></Link>
            </div>
        </div>
    );
}

export default ToMain;