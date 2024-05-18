import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true);
  }

  //useRef Hook
  const passwordRef = useRef(null)

  const passWordGenerator = useCallback(() => {
    let pass = ""; //jo bhi password hoga wo bana lunga aur setPassword se use password me add kar lunga
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //wo data aayega jisse ham apna password banayenge

    if (numberAllow) {
      str += "0123456789"; //agar numberallow ki value true hai to kuch bhi random inme se add kar do pass me
    }
    if (charAllow) {
      str += "`~!@#$%^&*()_+<>?.[]{}|";
    }

    //loop kitni baar chalega lenfth decide karegi
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //yaha par array ki koi bhi index value randomly uth ke aa rahi hai
      pass += str.charAt(char);

      //loop khatam hote hi pass ke andar value aa jayegi
    }

    
    setPassword(pass);

  }, [length, numberAllow, charAllow, setPassword]); //function and dependencies pass hogi array ke form me,setPas ke basis par bhi ha cheeze change karenge, setpassword optimisation ke liye dala gaya hai, yaha par sePassword karrke memory me store ho raha hai

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();                   //copy karne ke baad pas highlight ho jayega
    passwordRef.current?.setSelectionRange(0, length)     //kitna password change karna hai uske liye range bhi hai
    window.navigator.clipboard.writeText(password)
  }, [password])  //usecallback me jo bhi cheeze interrelated hoti hai ya fir jisse hame baat kar paate hai wo sab dependencies me aati hai

  //useEffect Hook---->agar upar wale mehod me kuch bhi change kiya jaye to unhe dubara se run kr do
  useEffect(() => {
    passWordGenerator()
  }, [length, numberAllow, charAllow, passWordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  text-orange-500 my-20 bg-gray-700">
        <h1 className="text-2xl text-center font-semibold text-orange-500 font-serif my-3">
          PassWord Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-5">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="PassWord"
            readOnly
            ref={passwordRef}   //yha par keh sakte hai ki hamare pas assword ka refrence hai
          />

          <button onClick={() => {
            copyPasswordtoClipboard();
            handleClick();
          }} className="rounded-r-lg outline-none  px-2 py-2 text-white font-serif" style={ {backgroundColor: clicked ? "#000": "blue"} }>
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1  mr-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 mr-4">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllow((prev) => !prev); //previous value jo bhi hai use reverse kar do
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setcharAllow((prev) => !prev); //previous value jo bhi hai use reverse kar do
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
