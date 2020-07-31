import React, { MouseEvent, Component } from 'react';
import {BreadCrumbV2ItemModel} from "@adobe/aem-core-components-react-base/dist/layout/breadcrumb/v2/BreadCrumbV2";

// @ts-ignore
import { createCustomElement, DOMModel, byChildrenRefArray, byBooleanAttrVal, byAttrVal, registerEvent } from "@adobe/react-webcomponent";
import MetaUtils from '../../utils/MetaUtils';
import withAsyncImport from "../../utils/withAsyncImport";


class BreadCrumbItemModel extends DOMModel implements BreadCrumbV2ItemModel{
    @byBooleanAttrVal() active: boolean = false
    @byAttrVal() url: string = ""
    @byAttrVal() title: string = ""
}

class BreadCrumbModel extends DOMModel{
    @byChildrenRefArray("div.breadcrumb-item", BreadCrumbItemModel) items: BreadCrumbItemModel[] = [];

}

class ReactBreadCrumb extends Component<BreadCrumbModel> {
    render() {

        const BreadCrumbV2 = withAsyncImport(() => import(/* webpackChunkName: "BreadCrumbV2" */ '@adobe/aem-core-components-react-base/dist/layout/breadcrumb/v2/BreadCrumbV2'));
        return (
            <BreadCrumbV2
                isInEditor={MetaUtils.isInEditor()}
                items={this.props.items}
                ariaLabelI18n={'BreadCrumb'}
            />
        )
    }
}


const ButtonCustomElement = createCustomElement(ReactBreadCrumb, BreadCrumbModel, "container");
// @ts-ignore
window.customElements.define("core-breadcrumb", ButtonCustomElement);