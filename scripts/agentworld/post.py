import json, re
b = json.load(open('raw.json'))
out, i = [], 0
while i < len(b):
    x = b[i]; i += 1
    if x['t'].startswith('small:'): continue
    if x.get('pn') == 58 and x['t'] == 'p' and x['text'] == '•':
        items = [[]]
        while i < len(b) and b[i]['t'] == 'p' and b[i].get('pn') == 58:
            t = b[i]['text']; i += 1
            if t == '•': items.append([])
            else: items[-1].append(t)
            if 'The first selection' in t: break
        items = [' '.join(g) for g in items]
        last = items[-1]; k = last.find(' The first selection')
        if k > 0: items[-1], rest = last[:k], last[k+1:]
        else: rest = None
        out.append({'t': 'ul', 'items': items})
        if rest: out.append({'t': 'p', 'text': rest})
        continue
    x.pop('pn', None)
    if x['t'] == 'h2' and x['text'].startswith('SUBMIT'): continue
    out.append(x)
# final call-to-action link
for x in out:
    if x['t'] == 'h3' and x['text'].startswith('SUBMIT PROPOSAL AT'):
        x['t'] = 'cta'; x['href'] = 'https://agentworld.antikythera.org'
json.dump(out, open('blocks.json', 'w'), ensure_ascii=False, indent=1)
for n, x in enumerate(out):
    if x['t'] in ('ul', 'cta') or 'CALL' in x.get('text', ''): print(n, json.dumps(x, ensure_ascii=False)[:400])
print(len(out))

# --- suggested highlights (verbatim; checked against the text) ---
b = out
H = [
(4, "Human societies are the environmental niches into which new artificial species must adapt."),
(11, "First, agents model humans, and then become the model against which humans model themselves."),
(19, "It has proven much more difficult to teach humans how computers think than to teach computers to behave as if they knew how humans think."),
(22, "In short, humans are inventing a world in which we make ourselves into privileged aliens in our own midst."),
(24, "This is not prediction, but rather the active composition of categories through which contact will be navigated."),
(25, "An agent appears to its user as a coherent entity, a fixed package, a persistent character, but these are parallax effects performed to suit what humans expect to see when interacting with something capable of robust causal agency."),
(39, "At this moment, and likely forevermore, humans as a whole no longer provide most of the system’s problem-solving capacity. They instead act as a slower abstraction layer guiding a much larger field of artificial cognition."),
(40, "“Society” becomes a composite organism where humans remain normatively central but computationally secondary, navigating a world whose dominant cognitive mass is no longer biological but mineral-based."),
(55, "However, part of what makes agentic AI both perplexing and exciting is how it delinks performed subjectivity from functional agency."),
(59, "There’s no homunculus waiting in the weights."),
(63, "The individuated agent is not a monad but a lamination."),
(77, "Users will, in subtle but meaningful ways, come to resemble their agents as much as the agents will resemble their users."),
(79, "The agent does not merely reflect the user the way a mirror reflects a figure. The mirror talks back."),
(85, "As we design agents we need to understand that we are not simply making technologies; we are remaking our own thought processes (just as writing did, or mirrors did, and so on), and the success of the technology is inseparable from the success of that refashioning."),
(98, "Physical agents will not only adapt to existing niches but also reconstruct those niches through their ongoing adaptations."),
(108, "Physical agentic AI need not end in gray goo, but rather a synthetic rainforest."),
(122, "For Agentworld, simulations have meaningful agency in the world. They directly cause things to occur; the membrane between simulation and simulated perforates."),
(125, "Friends and enemies formally simulate and counter-simulate one another in oscillating sequences that attempt to model the models of the models."),
(137, "The design problem is representation, not conversation."),
(145, "The people who are best at thinking like procedural code will not have a monopoly on software and hardware."),
(164, "Reinforcement learning, broadly defined, becomes how we raise our agents and teach them not just tasks and skills but perspectives and talents."),
(171, "The scaffolds that give order to the interactions of multiple kinds of agents toward decisions and outcomes are agent institutions."),
(176, "But purified economics is insufficient to build a society, real, virtual, or hybrid."),
(183, "Crucially, the intelligence that makes institutions effective is not reducible to the intelligence of the agents who populate them."),
(211, "Long horizons are a property of groups."),
(213, "The apparent stability is the stability of monoculture, which is the stability immediately preceding correlated failure."),
(216, "Trust here is not a moral category but a prediction-stability category: an agent is trusted to the degree its behavior remains well-modeled across the adversarial and cooperative transitions that punctuate any long interaction."),
(234, "But very soon most of the speakers of human languages won’t be human."),
(242, "When the realm of the uniquely human is defined as that which AI cannot be or do, the result is a “humanity of the gaps” trap in which, like the older “god of the gaps” dilemma, the self-assigned domain is a shrinking corner of the world."),
(254, "This is less an expansion of the moral circle than a reindexing of its center."),
(266, "What is new is only that most of those minds will be non-biological."),
(268, "The same weights operating inside a richer harness produce substantially more cumulative intelligence than a stronger model operating alone, and the harness improves on a different clock, driven by usage rather than training."),
(269, "The unit that learns is the ensemble, not the agent, and what it learns accrues to the commons between them, not to any single one."),
(280, "Alignment in this sense is not a prior constraint on capability but a co-evolutionary outcome of contact."),
(285, "life is intensive (a flea is no less alive than an elephant) while intelligence is extensive: it is additive, scalable, and fundamentally a property of coupling rather than substrate."),
]
bad = [(i, q[:50]) for i, q in H if q not in b[i].get('text', '')]
print('missing', bad)
for i, q in H:
    b[i].setdefault('hl', []).append(q)
# figures: rename to published paths
for x in b:
    if x['t'] == 'fig': x['src'] = f"/agentworld/{x['src']}.webp"
json.dump({'status': 'suggested', 'blocks': b}, open('data.json', 'w'), ensure_ascii=False)
print(len(H), 'highlights; data', len(open('data.json').read()) // 1024, 'KB')
