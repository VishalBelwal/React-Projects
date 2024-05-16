import React from 'react'

function Buttons({buttons, changeColor}) {
  return (
    <>
      <div className="w-full h-screen duration-200" >
        <div className="fixed flex flex-wrap justify-center bottom-8 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white rounded-3xl px-2 py-2">
            {
              buttons.map((button, index) => (
                <button key={index} className="outline-none px-5 py-1 rounded-2xl text-white shadow-lg" style={{backgroundColor: button.bgColor}} onClick={() => changeColor(button.bgColor)}>{button.displaycolor}</button>
              ))
            }
          </div>
        </div>
      </div> 
    </>
  )
}

export default Buttons