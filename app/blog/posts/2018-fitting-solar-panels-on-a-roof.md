---
title: "fitting solar panels on a roof"
publishedAt: "2018-07-03"
dateBasis: "source event date; reconstructed post"
summary: "fitting solar panels on a roof"
reviewDraft: "true"
---

I was working on a Reinforcement Learning based Design Search Engine for Solar Roofs and gave a talk about it at the Solar Conference in Gandhinagar. It's still in development mode and you can track it at this repo.

# Problem

Given a roof polygon, find the best solar panel placement. The best placement is defined as the one which maximizes the energy generation along with the constraints.

* * *

# Constraints

While fitting panels, we need to take care of the fact that the panel has to lie entirely within the roof. Also, panels should not overlap each other.

![roofmap_panels.png](/assets/img/2018-06-30-Design-Search-Solar-Roof-i/roofmap_panels.png)

![roofmap_panels_multi.png](/assets/img/2018-06-30-Design-Search-Solar-Roof-i/roofmap_panels_multi.png)

One way to do it would be to throw away the designs which are not valid. However, this would take a lot of computation.  So we need a rule to cut down on the possible placements, to make the task of finding good designs easier.

## Panel Area Constraint

For the panel to lie entirely inside the roof, either all the four corners of the panel should lie within the roof polygon or all the panel area covered by the roof area.

In order to compute this we need to define some functions. All of these functions are defined in `constraints.py` file in the repo.

## Boundary

We can find the boundary of the roof polygon using `get_boundary()` function. It returns a list of points.

## Intersection

Now to check whether the panel lies inside the roof, we need to check the intersection of the panel and the roof polygon. To get the intersection we use `get_intersection()` which returns the area of intersection.

## Generation

In order to compute the power generation we need to have the sun position at our location on the day, which we want to generate the power for. We can generate the sun positions using `get_sun_positions()`, defined in `sun_positions.py`. We also need the normal vector of the panel, this can be found using `get_normal_vector()` defined in `panel_points.py`. These two are used to find the sunlight incident on the panel using `get_Sun_Incident()` defined in `generation.py`. This function returns the generation with respect to the generation of a panel facing the sun directly.

## Size

To find the size of the polygon we use `get_area()` function. Following are the results for a few polygons

* * *

![roof1.png](/assets/img/2018-06-30-Design-Search-Solar-Roof-i/roof1.png)

Area: 233.35

![roof2.png](/assets/img/2018-06-30-Design-Search-Solar-Roof-i/roof2.png)

Area: 363.77

![roof3.png](/assets/img/2018-06-30-Design-Search-Solar-Roof-i/roof3.png)

Area: 70.68

## Overlap

To find the overlap we use the same `get_intersection()` function.

* * *

# Future Work

I had earlier noted that we can use the `get_area()` function to find the possible placements, however, that is not a good solution. Because we are sampling from the continuous distribution. We only need the valid positions. What would be better is if we could find a way to sample from these valid positions directly instead of filtering out the invalid ones.

* * *

# Resources

* My code
* [Excalidraw](https://excalidraw.com/)
* [Matplotlib](https://matplotlib.org/)
* [Shapely](https://shapely.readthedocs.io/en/latest/)
* [Rob Hennekes](https://thesolarlabs.notion.site/Rob-Hennekes-Solar-Engineer-at-Helioscope-15-01-2020-d4793a9d3fe94e80b4a1b564c7d92118?pvs=21)