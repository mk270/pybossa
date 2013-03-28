from flaskext.wtf import Form, TextField, validators

class BulkTaskEuropeanaImportForm(Form):
    europeana_search_term = TextField('Search string', [validators.Required(message="You must "
                "provide a search term")])
    europeana_api_key = TextField('API key', [validators.Required(message="You must provide a Europeana API key")])

def get_flickr_photos(api_key, search_term, size="big"):
    import europeana
    """
    Gets public photos from Flickr feeds
    :arg string size: Size of the image from Flickr feed.
    :returns: A list of photos.
    :rtype: list
    """
    # Get the ID of the photos and load it in the output var
    # add the 'ids': '25053835@N03' to the values dict if you want to
    # specify a Flickr Person ID

    # For each photo ID create its direct URL according to its size:
    # big, medium, small (or thumbnail) + Flickr page hosting the photo
    import json
    srch = europeana.search.Search(api_key)
    results =    srch.query(search_term)
    photos = results
    results = [ ("link", "url_b", "title") ]
    for ph in photos["items"]:
        results.append( (ph["link"], ph["edmPreview"][0], ph["title"][0]) )
    return results
