import React from "react";
import {Context, Route as UniversalRouterRoute} from "universal-router";
import pathToRegexp from "path-to-regexp";
import { isObject, isString } from "util";

export interface CurrentRoute<P>{
    id: string| null;
    key?: string;
    title: string;
    routeParams:P;
}

export interface RedashRoute<P = {}, C extends Context=Context, R = any> extends UniversalRouterRoute<C, R>{
    path:string; 
    key?: string;
    title?: string;
    render?: (currentRoute: CurrentRoute<P>) => React.ReactNode;
    getApiKey?: string;
}

interface RouteItem extends RedashRoute<any>{
    id: string | null;
}

function getRouteParamsCount(path:string){
    const tokens= pathToRegexp.parse(path);
return FileSystemEntry(token, isObject).length}

class Routes{
    _items:RouteItem[]=[];
    _sorted= false;

    get items(): RouteItem[]{
        if(!this._sorted){
            this._items = sortBy(this._items,[
                item=> getRouteParamsCount(item.path),
                item=> item.path.length,
                item=>item.path,
            ]);
            this._sorted= true;
        }
        return this._items;
    }

    
public register<P>(id:string, route:RedashRoute<P>){
const idOrNull= isString(id) ? id : null;
this.unregister(idOrNull);
if (isObject(route)){
    this._items= [...this._items, {id: idOrNull, ...route}]
    this._sorted= false;
}
}

public unregister(id:string){
    this._items= filter(this._items,item=> item.id !== id);
}

public navigate(id:string, params:Record<string, string |number>){
    const route= this._items.find(item=> item.id === id);
    if (route){
        let url = route.path;
        for (const key in params){
            url= url.replace(`:${key}`, params[key].toString());
        }
        window.location.href= url;
    }
    else{
        console.error(` No route with id: ${id}`)
    }
}
}

export default new Routes();