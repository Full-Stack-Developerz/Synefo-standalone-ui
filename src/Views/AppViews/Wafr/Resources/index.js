import React from 'react';
import Security from "../../../../assets/img/wafr/security.png"
import TotalCost from "../../../../assets/img/wafr/total-cost.png"
import TotalReliability from "../../../../assets/img/wafr/total-reliability.png"
import Operations  from "../../../../assets/img/wafr/operations.png"
import Performance from "../../../../assets/img/wafr/performance.png"

class MetricCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null
    };
  }

  handleCardClick = (index) => {
    this.setState({ selectedCard: index });
  }

  render() {
    const metrics = [
      { title: 'Security', imgSrc: Security, color: 'bg-[#FAA24B] ', score: '0/10' },
      { title: 'Total Cost', imgSrc: TotalCost, color: 'bg-[#8198BE] ', score: '0/10' },
      { title: 'Total Reliability', imgSrc: TotalReliability, color: 'bg-[#66C8FF] ', score: '0/10' },
      { title: 'Operations', imgSrc: Operations, color: 'bg-[#FF708B] ', score: '0/10' },
      { title: 'Performance', imgSrc: Performance, color: 'bg-[#8676FF] ', score: '0/10' },
    ];

    return (
      <div className="flex space-x-4 w-full">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`flex items-center w-full bg-white py-4 px-4 rounded-lg cursor-pointer transition-all ${
              this.state.selectedCard === index ? 'border-2 border-blue-500' : 'border border-gray-200'
            } `}
            onClick={() => this.handleCardClick(index)}
          >
            {/* <metric.icon className={`w-10 h-10 mr-3 p-2 rounded-lg ${metric.color}`} /> */}
            <img
              src={metric.imgSrc}
              alt={metric.title}
              className={`w-10 h-10 mr-3 p-2 rounded-lg ${metric.color}`}
            />
            <div>
              <h3 className="font-semibold text-sm">{metric.title}</h3>
              <p className="text-md text-black mt-1 text-nowrap">{metric.score} <span className="text-gray-500">Answer Saved</span></p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MetricCards;