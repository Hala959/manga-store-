import React, { Component } from 'react';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
 class Fave extends Component {
    
    constructor() {
        super ()
        this.state = {
			isFave: false
    }
}
    handleClick = (e) => {
		e.stopPropagation();
        this.setState({isFave :!this.state.isFave})
        
	}
    
    render() {
        const isFave = this.state.isFave ? "remove_from_queue" : "add_to_queue" 
        return (
            <div>
                
                <div className={`film-row-fave ${isFave}`}onClick={this.handleClick} >
                 
    <AddToQueueIcon />
</div>
            </div>
        )
    }
}
export default Fave;