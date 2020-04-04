// LaunchBar Action Script
include('common.js');

function run(query) {
    if (query) {
        if (throttle(1000)) {
            const res = makeRequest(query);
            if (res) return formatResponse(res);
        }
    }
    return NO_EXPLANATION;
}

/**
 * Makes a request.
 *
 * @param      {string}         query   The query
 * @return     {object | null}
 */
function makeRequest(query) {
    query = encodeURIComponent(query);
    const res = HTTP.getJSON(`${ENDPOINT}/openapi.do?keyfrom=launchbar-trans&key=1601880549&type=data&doctype=json&version=1.1&q=${query}`);
    if (res && res.data) {
        return res.data;
    }
    return null;
}

/**
 * Format the response from Youdao
 *
 * @param      {object}  res     The resource
 * @return     {Array}
 */
function formatResponse(res) {
    const items = [];

    if (res.translation) {
        items.push(...formatTranslations(res.translation));
    }

    if (res.basic) {
        if (res.basic.phonetic) items.push({title: res.basic.phonetic});
        if (res.basic.explains) items.push(...formatExplains(res.basic.explains));
    }

    if (res.web) {
        items.push(...formatWebs(res.web))
    }

    return items;
}

/**
 * Format the explains into items
 *
 * @param      {array<string>}  [explains=[]  ]  The explains
 * @return     {items}
 */
function formatExplains(explains = []) {
    return explains.map((explain) => {
        return {
            title: explain
        };
    });
}

/**
 * Format usages
 *
 * @param      {Array<{key: string, value: stringp[]}  >}      [webs=[]]  The webs
 * @return     {items}
 */
function formatWebs(webs = []) {
    const items = webs.map((web) => ({
        icon: 'font-awesome:fa-info',
        title: `${web.key}`,
        label: web.value.join('; '),
    }));

    if (items.length < 0) {
        return [];
    }

    return [{
        icon: 'font-awesome:fa-info',
        children: items,
        title: '查看更多网络释义',
        badge: items.length.toString(),
    }];
}

/**
 * Format translations into items
 *
 * @param      {string[]}  [trans=[]]  The transaction
 * @return     {items}
 */
function formatTranslations(trans = []) {
    return trans.map((item) => {
        return {
            title: item
        }
    })
}