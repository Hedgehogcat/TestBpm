function uiPopulateFormWithItemEx(form, itemNd, itemTypeNd, isEditMode) {
    if (!form) return false;
    var doc = form.document;


    doc.isFormPopulated = false;

    if (!itemNd) return false;
    
    var q = doc.getElementById("362AB0C1D0214CF9B5AFFD0EE6C6AA19");
    q.value = "362AB0C1D0214CF9B5AFFD0EE6C6AA19"; //fnote_system
    var p = doc.getElementById("fnote_system");
    p.value = "fnote_system"; //fnote_system
    //alert(p.value);
    //    var iomItem = new Item();
    //    iomItem.dom = itemNd.ownerDocument;
    //    iomItem.node = itemNd;

    //    doc.item = itemNd;
    //    doc.thisItem = iomItem;
    //    doc.itemID = itemNd.getAttribute('id');
    //    doc.isTemp = (itemNd.getAttribute('isTemp') == '1');
    //    if (isEditMode == undefined) isEditMode = (doc.isTemp || this.getItemProperty(itemNd, 'locked_by_id') == this.getCurrentUserID());
    //    doc.isEditMode = isEditMode;

    //    if (!itemTypeNd) {
    //        itemTypeNd = this.getItemTypeDictionary(itemNd.getAttribute('type')).node;
    //        if (!itemTypeNd) return false;
    //    }

    //    var propNds = itemTypeNd.selectNodes('Relationships/Item[@type="Property" and name!="" and ' +
    //    '(not(@action) or (@action!="delete" and @action!="purge"))]');

    //    if (!propNds.length) {
    //        itemTypeNd = this.getItemTypeDictionary(itemNd.getAttribute('type')).node;
    //        if (!itemTypeNd) return false;
    //    }

    //    var propNds = itemTypeNd.selectNodes('Relationships/Item[@type="Property" and name!="" and ' +
    //    '(not(@action) or (@action!="delete" and @action!="purge"))]');

    //    var propNm, elem, newVal, propDataType, propPtrn;
    //    var theLastSS = doc.styleSheets[doc.styleSheets.length - 1];

    //    for (i = 0; i < propNds.length; i++) {
    //        var workProp;

    //        if (this.getItemProperty(propNds[i], 'data_type') == 'foreign') {
    //            workProp = this.uiMergeForeignPropertyWithSource(propNds[i], true);
    //        }
    //        else {
    //            workProp = propNds[i];
    //        }

    //        propDataType = this.getItemProperty(workProp, 'data_type');
    //        propPtrn = this.getItemProperty(workProp, 'pattern');
    //        propNm = this.getItemProperty(propNds[i], 'name');
    //        elem = doc.getElementById(propNm + '_system');
    //        if (!elem) continue;

    //        newVal = this.getItemProperty(itemNd, propNm);
    //        newVal = this.convertFromNeutral(newVal, propDataType, this.getDotNetDatePattern(propPtrn));
    //        if (elem.value != newVal) elem.value = newVal;
    //        else if (newVal != '') {
    //            elem.value = '';
    //            elem.value = newVal;
    //        }
    //    }


    doc.isFormPopulated = true;

}