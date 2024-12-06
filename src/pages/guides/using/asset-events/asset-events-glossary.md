---
title: Asset Events Glossary
---

# Glossary

### ACL Policy Resource

The Access Control List of the [asset](#asset). Access Control is a method of controlling who is permitted or denied which operation on what resource.

### Asset

An item of content and data about that content, bound together under a single identifier and with a common lifetime. Assets, in turn, are organized into hierarchical namespaces, and each namespace is managed by a [repository](#repository). The platform defines three classes of assets: [files](#file), [composites](#composite), and [directories](#directory).

### Component

A unit of content storage within a [composite](#composite). components are the individual files that, collectively, contain the majority of the content in a typical composite. As the atomic units of composites, each Component should contain data in a single media type.
composites typically contain tens, hundreds, or thousands of components bound together via a [manifest](#manifest).

### Composite

An [asset](#asset) stored in a composite format instead of a traditional, single-file format. composite formats organize content as a set of [components](#component) bound together with a [manifest](#manifest). These formats are built on top of the Digital composite Technology DCX framework, which describes both the organization of the components as well as the transfer and synchronization algorithms used to operate on them.

### DCX Snapshot

The single-file representation of a [composite](#composite), stored as a [Universal Container Format (UCF)](#universal-container-format-ucf) package. A Snapshot contains the following:

- MIME-type file, which contains the media type of the Snapshot. This file does not have an extension.
- manifest file, which is the [manifest](#manifest). This file does not have an extension.
- files and folders containing the [components](#component), which are all stored according to their full paths.

### Directory

An [asset](#asset) that serves as a container for other assets in the namespace maintained by a [repository](#repository). Every directory itself is either contained in exactly one other directory, or is the root directory of a repository.

### Embedded Metadata Resource

The Embedded Metadata Resource provides a view into the metadata that is embedded in the [Primary Resource](#primary-resource) of a [file](#file) or [composite](#composite). This takes the form of Extensible Metadata Platform (XMP) metadata.

**Note**: [Directories](#directory) do not contain embedded metadata.

### File

Any [asset](#asset) that is not a [directory](#directory) or a [composite](#composite). When an asset is created, it will be a file unless it has media type `application/vnd.adobecloud.directory+json` (for directories) or either of the structured suffixes `+dcx` and `+dcxucf`, which indicate composites.

### Manifest

A JSON file that ties together a [composite](#composite). A manifest contains the [structure nodes](#structure-nodes) that reference all the components of a composite.

The elements that make up the structure tree of a [composite](#composite). Most composites have some internal structure; for example, a sketchbook is organized into pages, and an image may be composed of a hierarchy of layers. Nodes are recorded in the [manifest](#manifest) as JSON objects, and represent the pages, layers, or other structural elements that constitute a composite. composites always have at least one node (referred to as the _root node_), and each node contains references to [components](#component), as well as child nodes.

### Primary Resource

The role and function of the Primary Resource varies between different [asset](#asset) classes. For [files](#file), the Primary Resource contains the data associated with the file. For [directories](#directory), the Primary Resource contains a JSON representation of the directory contents. For [composites](#composite), the Primary Resource contains a representation of the composite as a [DCX Snapshot](#dcx-snapshot).

### Rendition Resource

A rendition is a representation of an [asset](#asset), typically containing less data than the [asset](#asset) from which it is derived. The prototypical example of a rendition is the thumbnail of an image, which is usually a lossy and smaller version of the original image.

### Resource

The expression of the content and data within an [asset](#asset). Resources are the addressable unit in the platform: they have a URI, and HTTP operations can be applied to them. There are multiple content and data resources associated with each asset.

### Repository

A partition of content organized in a namespace hierarchy, analogous to a volume or drive in desktop operating systems.

### Repository Metadata Resource

A [resource](#resource) that contains metadata about an [asset](#asset) as maintained by a [repository](#repository).

### Universal Container Format (UCF)

A general-purpose container technology that collects a related set of files into a single-file container. UCF is based on the widely used ZIP archival format, and conforms to the OEBPS Container Format guidelines, as well as the Open Document Format 1.0 specification. Off-the-shelf ZIP tools can be used to open, inspect, and extract files from UCF packages.

### Versions Resource

The Versions Resource provides the set of all available versions of an [asset](#asset).

### XDM

The Experience Data Model (XDM) is a technology for modeling data used at Adobe, along with associated models. It is a stylized use of [JSON Schema](https://json-schema.org/) and [JSON-LD](https://json-ld.org/), and is a publicly documented specification, made available under a Creative Commons license.