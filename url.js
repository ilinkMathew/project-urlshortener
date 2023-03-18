const client = require("./mongo");


const db = client.db(process.env.DB);

async function getShortUrl(urlModel) {
    let seq = await getNextSeq();
    if (!seq) return null;
    urlModel._id = seq;
    const doc =  await db.collection('url').insertOne(urlModel);

    return doc ? {'original_url':urlModel.original_url,'short_url':urlModel._id} : null
}


async function getNextSeq() {
    const seq = await db.collection('counters').findOneAndUpdate(
        { "tag": "seq" },
        { $inc: { seq_val: 1 } },
        {new:true}
    )
    return seq.value ? seq.value.seq_val : null
}

 async function getUrlById(id){
    const doc = await client.db(process.env.DB).collection('url').findOne({"_id":parseInt(id)})
    return doc ? doc : null;
}
module.exports = {
    getUrlById,
    getNextSeq,
    getShortUrl
}
