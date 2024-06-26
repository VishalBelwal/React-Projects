import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [ammount, setAmmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmmount, setConvertedAmmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from);

  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  //swap ka method form kar rahe hai
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmmount(ammount)
    setAmmount(convertedAmmount)
  }

  //jab user convert par click are to tab kya hoga wo functionality banaenge
  const convert = () => {
    const convertedAmmount = ammount * currencyInfo[to]
    setConvertedAmmount(convertedAmmount);
  };

  return (
    <>
      <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                ammount={ammount}
                currecyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmmountChange={(ammount) => setAmmount(ammount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
            <InputBox
                label="To"
                ammount={convertedAmmount}
                currecyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                ammountDisable                      //true pass kare ya na kare baat ek hi hai
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default App
