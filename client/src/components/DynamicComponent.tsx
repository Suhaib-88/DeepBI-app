import {isFunction, isString, isUndefined} from "lodash";
import React from "react";
import PropTypes from "prop-types";

const componentsRegistry= new Map();
const activeInstances = new Set();

export function registerComponent(name, component){
    if(isString(name) && name !==''){
        componentsRegistry.set(name, isFunction(component)? component:null);
        activeInstances.forEach(dynamicComponent => {
            if (dynamicComponent.props.name===name){
                dynamicComponent.forceUpdate();
            }
            
        });
    }
}

export function unregisterComponent(name){
    registerComponent(name, null)
}

export default class DynamicComponent extends React.Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
        fallback: PropTypes.node,
        children: PropTypes.node,
    
    };
    static defaultProps = {
        children:null
    };
    componentDidMount(){
        activeInstances.add(this);
    }
    componentWillUnmount(): void {
        activeInstances.delete(this);
    }

    render(): React.ReactNode {
        const {name, fallback, children,...props} = this.props;
        const RealComponent = componentsRegistry.get(name);
        if (!RealComponent){
            return isUndefined(fallback)? children : fallback;
        }
        return <RealComponent {...props}> {children}</RealComponent>
    }
}