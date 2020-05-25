// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import _ from 'lodash'
import all from './*.md'

const posts = _.chain(all) // begin a chain
			   .map(transform) // transform the shape of each post
			   .orderBy('date', 'desc') // sort by date descending
			   .value() // convert chain back to array

// function for reshaping each post
function transform({filename, html, metadata}) {
	// the permalink is the filename with the '.md' ending removed
	const slug = filename.replace(/^_/, '').replace(/\.md$/, '')

	// convert date string into a proper `Date`
	const date = new Date(metadata.date)

	// return the new shape
	return {...metadata, slug, date, filename, html}
}

// provide a way to find a post by permalink
export function findPost(permalink) {
	// use lodash to find by field name:
	return _.find(posts, {permalink})
}

export default posts
