[<img title="Pelagios Network" src="./logos/pelagios.svg" height="60" align="left">](https://pelagios.org/)
# Peripleo | MARK16 Dataviz

*Dataviz* is a a geographic data visualization interface for the FNS [MARK16](https://mark16.sib.swiss) project:

https://dataviz-mark16.sib.swiss 

This visualization shows the MARK16 manuscripts included in our [manuscript room](https://mr-mark16.sib.swiss). It allows to filter our data by language, manuscript, location and type of institution. The languages are presented in alphabetical order to highlight some lesser-known manuscripts in Arabic, Armenian, Coptic, etc. The location indicates, for example, whether the manuscript is in an institution physically, virtually (as a facsimile), or both.
Dataviz was created with the Peripleo tool in collaboration with our partners at the [Pelagios Network](https://pelagios.org/). 

*Peripleo* is a prototype application for the discovery and spatial visualisation of collection data, originally an initiative of the [Pelagios Network](https://pelagios.org/) and developed early in 2022 as part of the British Library's [**Locating a National Collection project**](https://britishlibrary.github.io/locating-a-national-collection/) (LaNC). LaNC was a Foundation project within the AHRC-funded [Towards a National Collection Programme](https://www.nationalcollection.org.uk/).


## LinkedPlaces Data

Our [LP-Format](https://github.com/LinkedPasts/linked-places-format) data can be found here: https://github.com/sib-swiss/dh-dataviz/blob/main/public/data/mark16-lp.json

## Code Reuse

Our javascript implementation of Peripleo can be found here: https://github.com/sib-swiss/dh-dataviz/blob/main/public/peripleo-lanc.js

It is a slightly different version from the original Peripleo, with facets ordered alphabetically, and places displaying a list of related manuscripts instead of a list of links.

## Installation

See the *Peripleo* instructions for the visualisation of your own geospatial data:
1. the [Installation Guide](https://github.com/britishlibrary/peripleo/blob/main/README.md), and
2. the [Configuration Guide](https://github.com/britishlibrary/peripleo/blob/main/Configuration-Guide.md).
