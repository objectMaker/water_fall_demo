import XwaterFall from "../views/XwaterFall";
import YwaterFall from "../views/YwaterFall";
export default [
    {
        path:'/x',
        component:XwaterFall,
    },
    {
        path: '/y',
        component: YwaterFall,
    },
    {
        path: '/',
        redirect:()=>'/y',
    }
]