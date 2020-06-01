import React from 'react';
import './index.css';

export interface TickerProps {
  width: number;
  maxHeight: number;
  percent: number;
  text: string;
  value: number;
  showValue: boolean;
  unit: string;
  lineNum: number;
  defaultColor: string;
  activeColor: string;
  textStyle: object;
  valueStyle: object;
}

const random = (min:number, max:number):number => {
  return min + Math.random() * (max - min)
}

const Ticker: React.FC<TickerProps> = function(props:TickerProps) {
  const { 
    width = 100, 
    maxHeight = 10,
    percent = 50, 
    value,
    text = '瞬时能见度', 
    showValue = true, 
    unit = 'M', 
    lineNum = 12,
    defaultColor = '#06c',
    activeColor = 'red',
    valueStyle,
    textStyle
  } = props
  const gap = (width - 2 * lineNum) / (lineNum - 1)
  return (
    <div className="ticker">
      {
        showValue &&
        <div className="value" style={valueStyle}>
          { value || 0 } <span className="unit">{ unit }</span>
        </div>
      }
      <div className="tickerGraph" style={{width: width + 'px', height: maxHeight + 'px'}}>
        <div className="tickerLine" style={{borderBottomColor: defaultColor}}>
          {
            new Array(lineNum).fill(0).map((item:number, i: number) => {
              let isActive = (i + 1) <= Math.floor(lineNum * percent / 100)
              return <span 
                       className="tick"
                       style={{
                         height: random(3, maxHeight) + 'px', left: (gap + 2) * i + 'px',
                         backgroundColor: isActive ? activeColor : defaultColor
                        }}>
                     </span>
            })
          }
        </div>
        <div className="tickerBar" style={{width: percent + '%', borderBottomColor: activeColor}}></div>
      </div>
      {
        !!text && <div className="text" style={textStyle}>{ text }</div>
      }
    </div>
  );
};

export default Ticker;
