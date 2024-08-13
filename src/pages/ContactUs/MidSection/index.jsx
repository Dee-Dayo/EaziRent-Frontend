import style from './index.module.css'
const MidSection = ()=>{
    return(
        <div className={style.container}>
            <div className={style.textSection}>
                <h2>Frequently asked questions</h2>
                <p>Everything you need to know about the product and billing.</p>
            </div>
            <div className={style.groupedText}>
                <div className={style.questions}>
                    <p><span className={style.tabSpace}>+ Where</span> can I find Eazi rent homes and prices</p>
                    <p><span className={style.tabSpace}>+ What</span> is included in the price of accommodation</p>
                    <p><span className={style.tabSpace}>+ What</span> is the procedure for arranging and booking
                        accommodation</p>
                    <p><span className={style.tabSpace}>+ How</span> do I pay the rest of the Accommodation price, at
                        once or in several installments?</p>
                    <p><span className={style.tabSpace}>+ What</span> if I am late with paying the advance payment or
                        the remaining amount?</p>
                    <p><span className={style.tabSpace}>+ How</span> can I cancel the Accommodation after having paid
                        the advance payment or the remaining amount?</p>
                </div>
                <div className={style.questions}>
                    <p><span className={style.tabSpace}>+ Will</span> I receive a refund of the advance payment or the remaining amount for the Accommodation in case of cancellation?</p>
                    <p><span className={style.tabSpace}>+ What</span> are the terms of payment by bank transfer and can
                        I pay by credit card?</p>
                    <p><span className={style.tabSpace}>+ Is</span> it possible to rent on Saturday to Saturday
                        period?</p>
                    <p><span className={style.tabSpace}>+ Is</span> a deposit required?</p>
                    <p><span className={style.tabSpace}>+ Is</span> it possible to check in before the time period?</p>
                    <p><span className={style.tabSpace}>+ Is</span> it cheaper if I book directly through the owner?</p>
                </div>
            </div>
        </div>
    )
}

export default MidSection