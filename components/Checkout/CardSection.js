import { CardElement } from '@stripe/react-stripe-js';

const CardSection = (props) => {
    return (
        <div>
            <div>
                <label htmlFor="card-element">信用卡/預付卡</label>
            </div>

            <div>
                <fieldset>
                    <div className="form-row">
                        <div id="card-element" style={{width:"100%"}}>
                            <CardElement />
                        </div>
                        <br />
                        <div className='order-button-wrapper'>
                            <button onClick={props.submitOrder}>確認落單</button>
                        </div>
                        {props.errorMsg ? (
                            <div>{props.errorMsg}</div>
                        ) : null}
                        {props.successMsg ? (
                            <div>{props.successMsg}</div>
                        ) : null}
                    </div>
                </fieldset>
            </div>
            <style jsx>
                {`
                    .order-button-wrapper {
                        display:flex;
                        width:100%;
                        align-items:flex-end;
                        justify-content: flex-end;
                    }   
                `}
            </style>
        </div>
    );
}

export default CardSection;