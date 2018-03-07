import fetch from 'isomorphic-fetch'


const state = {
    items: [],
    totalItems: 0,
    loading: false,
    saving: false,
    target: "",
    idKey: "",
}


export const mutations = {
    setItems(state,value){
        state.items = value.results || [];
        state.totalItems = value.totalResults || state.items.length;
    },
    setLoading(state, value){
        state.loading = !!value;
    },
    setSaving(state, value){
        state.saving = !!value;
    },
    setTarget(state, value){
        state.target = value;
    },
    setItemKey(state, value){
        state.idKey = value;
    },
}


export const actions = {

    setDefaults({ commit }, values){
        commit(mutations.setTarget.name, values.target)
        commit(mutations.setItemKey.name, values.key || "id")
    },

    listItems({ commit, state }, filters){
        commit(mutations.setLoading.name, true)
        const url = Object.keys(filters || {})
            .filter(key => filters[key] !== null && filters[key] !== "")
            .reduce((acc, key, i) => {
                const value = (i > 0 ? '&' : '') + `${key}=${filters[key]}`;
                return acc + value;
            }, state.target + "?")
        fetch(url)
            .then(response => {
                if(response.status > 400)
                    throw new Error("Error retrieving list of items")
                return response.json();
            })
            .then(payload => {
                commit(mutations.setItems.name, payload)
                commit(mutations.setLoading.name, false)
            })
    },


    createItem({ commit, state }, item){
        commit(mutations.setSaving.name, true)
        return new Promise((resolve,reject) => {
            const url = state.target;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => {
                if(response.status > 400){
                    commit(mutations.setSaving.name, false)
                    reject()
                    throw new Error("Error creating item")
                } else {
                    commit(mutations.setSaving.name, false)
                    resolve()
                }
            })

        })
    },


    editItem({ commit, state }, item){
        commit(mutations.setSaving.name, true)
        return new Promise((resolve,reject) => {
            const url = state.target + item[state.idKey];
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => {
                if(response.status > 400){
                    commit(mutations.setSaving.name, false)
                    reject()
                    throw new Error("Error editing item")
                } else {
                    commit(mutations.setSaving.name, false)
                    resolve()
                }
            })

        })
    },


    deleteItem({ commit, state}, item){
        commit(mutations.setSaving.name, true)
        return new Promise((resolve,reject) => {
            const url = state.target + item[state.idKey];
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => {
                if(response.status > 400){
                    commit(mutations.setSaving.name, false)
                    reject()
                    throw new Error("Error deleting item")
                } else {
                    commit(mutations.setSaving.name, false)
                    resolve()
                }
            })

        })
    },


}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}