function traverse(selector) {
    var node;
    if (selector[0] == ".") {
        if (document.querySelector(selector) != undefined && document.querySelector(selector) != null) {
            var nodeClass = document.querySelector(selector);
            node = nodeClass;
        } else {
            console.log("There is no class matched by the given selector!");
        }
    } else if (selector[0] == "#") {
        if (document.getElementById(selector) != undefined && document.getElementById(selector) != null) {
            var nodeID = document.getElementById(selector);
            node = nodeID;
        } else {
            console.log("There is no ID matched by the given selector!");
        }
    } else {
        console.log("Incorrect input!");
    }
    var counterCheckForFirstParent = 0;

    traverseNode(node, '');
    function traverseNode(node, spacing) {
        spacing = spacing || '  ';
        //console.log(spacing + node.nodeName);
        var getNodeId = node.getAttribute("id");
        var getNodeClass = node.getAttribute("class");
        var isId = getNodeId != null ? ' id=' + getNodeId : "";
        var isClass = getNodeClass != null ? ' class=' + getNodeClass : "";
        if (counterCheckForFirstParent != 0) {
            console.log(spacing + node.nodeName.toLowerCase() + ':' + isId + isClass);
        }
        counterCheckForFirstParent ++;
        for (var i = 0, len = node.childNodes.length; i < len; i += 1) {
            var child = node.childNodes[i];
            if (child.nodeType === document.ELEMENT_NODE) {
                traverseNode(child, spacing + '  ');
            }
        }
        //console.log(spacing + '/' + node.nodeName);
    }
}

var selector = ".birds";
traverse(selector);

//selector = "#birds";
//traverse(selector);

