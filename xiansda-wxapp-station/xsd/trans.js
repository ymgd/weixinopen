'use strict';


const agentAmount = (price, quantity, agent) => {
	const cost = price*quantity

	let fee = 0
  	if(agent.strategy == 1)
    	fee = agent.fee *  quantity
  	else if(agent.strategy == 2)
    	fee = agent.fee
  	else if(agent.strategy == 3)
		fee = (cost * agent.fee)/100.0

	agent.fee_min *= 1.00 
	agent.fee_max *= 1.00
	fee = (!!agent.fee_min && agent.fee_min> 0 && fee<agent.fee_min)?agent.fee_min:fee
	fee = (!!agent.fee_max && agent.fee_max> 0 && fee>agent.fee_max)?agent.fee_max:fee

	return {
		cost:cost.toFixed(2),
		fee:fee.toFixed(2),
		amount:(cost + fee).toFixed(2),
		max:fee==agent.fee_max,
		min:fee==agent.fee_min
	}
} 

module.exports = {
	agentAmount
}