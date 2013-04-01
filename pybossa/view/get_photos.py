
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
    resources = srch.resources(search_term)
    photos = []
    for i in xrange(0, 25):
        photos.append(resources.next())
    results = [ ("link", "url_b", "title", "creator") ]
    for ph in photos:
        if "edmPreview" not in ph["search_result"]:
            print "no preview"
            continue
        #if "dcDate" not in ph['object']['proxies'][0]:
        #    print "no date"
        #    continue
        if "dcCreator" not in ph['object']['proxies'][0]:
            print "no creator"
            continue
        print "adding"
        results.append( (ph["search_result"]["link"], 
                         ph["search_result"]["edmPreview"][0], 
                         ph["search_result"]["title"][0],
                         ph['object']['proxies'][0]['dcCreator']['def'][0]))#,
#                         ph['object']['proxies'][0]['dcDate']['def'][0])
#                        )
    return results
