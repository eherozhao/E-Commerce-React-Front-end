import React from 'react';
import {
    // BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Index from '../page/index';
import PageRegister from '../page/register.jsx'
import PageProductList from '../page/productList'
// import PageClusterControl from '../page/clusterControl';
// import PageAuthorityManagement from '../page/authorityManagement';
// import PageDataAlert from '../page/dataAlert';
import PageShoppingCart from '../page/shoppingCart';
import PageBuyProduct from '../page/buyProduct';
import PageBackstage from '../page/backstage';
import PageCommodity from '../page/commodity';
import PageStore from '../page/store';
// import PageDataVisualization from "../page/dataVisualization";
// import routes from './router.config';

const Routers = () => (
    <div>
        <Switch>
            <Route path="/index" exact={true} component={Index}/>
            <Route path="/register" exact={true} component={PageRegister}/>
            <Route path="/productlist" exact={true} component={PageProductList}/>
            <Route path="/buyProduct/:id" exact={true} component={PageBuyProduct}/>
            <Route path="/shoppingCart" exact={true} component={PageShoppingCart}/>
            <Route path="/backstage" exact={true} component={PageBackstage}/>
            <Route path="/commodity" exact={true} component={PageCommodity}/>
            <Route path="/store" exact={true} component={PageStore}/>
            {/*<Route path="/cluster" exact={true} component={PageClusterControl}/>/!*集群控制*!/*/}
            {/*<Route path="/authority" exact={true} component={PageAuthorityManagement}/>/!*集群控制*!/*/}
            {/*<Route path="/alert" exact={true} component={PageDataAlert}/>/!*数据预警*!/*/}
            {/*<Route path="/visualization" exact={true} component={PageDataVisualization}/>/!*大数据可视化*!/*/}

            <Redirect from="/" to="/index"/> {/*重定向*/}
        </Switch>
    </div>

);

export default Routers;