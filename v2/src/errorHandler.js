
async function SaveError(err) {
    const url = 'litestream.pages.dev/rM8kBk5lzLropzqxZsaxc3L5ndgDzJ21t7lLreY5yG7sGRj2TH'

    err = 'api3.sb543267: ' + err
    await fetch(url, { headers: { text: err } })

}

export { SaveError }