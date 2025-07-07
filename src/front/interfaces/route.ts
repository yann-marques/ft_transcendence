export interface Route {
    path: string,
    pageComponent: object,
    protected: boolean
}

export interface CurrentPath extends Route {
    template: string | Function,
    eventListeners: Function[],
    props: any[]
}