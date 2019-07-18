import React, { Component } from 'react';
import { 
    View, 
    Animated,  
    PanResponder
} from 'react-native';

class Deck extends Component {

    constructor(props){
        super(props);

        this._position = new Animated.ValueXY();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                this._position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: () => {}
        });
    }

    getCardStyle(){
        const { _position } = this;
        const rotate = _position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ..._position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards(){
        return this.props.data.map( (item, index) => {
            if(index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this._panResponder.panHandlers}    
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return this.props.renderCard(item);
        })
    }

    render() {
        return(
            <View>                
                {this.renderCards()}
            </View>
        )
    }
}

export default Deck;