---
layout: base
title: Welcome
bodyClass: index
metaDesc: "Group 6 is your technology partner for television, broadcast and post production system design and integration. We look after everyone from single seat editing installations to national broadcasters."
socialDesc: "Group 6 is your technology partner for television, broadcast and post production system design and integration. We look after everyone from single seat editing installations to national broadcasters."
---

<div class="jumbotron" itemscope itemtype="http://schema.org/Organization">
  <div class="container">
    <h1 itemprop="name">Group 6 Technologies!</h1>
    <p itemeprop="description">End to end television, post production, and broadcast facility solutions.</p>
    <div class="sprites-group6logo-small"></div>
    <div class="sprites-group6logo"></div>
  </div>
</div>

<div class="container">
  <section class="intro">
    <h1>Introducing Group 6</h1>
    <p>Group 6 is your technology partner for television, broadcast and post production system design and integration. We look after everyone from single seat editing installations to national broadcasters.</p>
    <p>Our services include upgrades, designed layouts, electrical and network fit-outs, post and broadcast system design, training, support and maintenance.</p>
  </section>

  <hr>

  <section class="diva" itemscope itemtype="http://schema.org/Product">
    <div class="row">
      <div class="col-sm-6">
        <h2 itemprop="name">DIVA Media System</h2>
        <div itemprop="description">
          <p>DIVA is a powerful distributed media management tool for the Avid post production environment.</p>
          <p>Simplify setup, share files, and get cutting with a click.</p>
        </div>
        <p class="lead">
          <a href="/diva/" itemprop="url">Learn about DIVA</a>
        </p>
      </div>
      <div class="col-sm-6">
        <a href="/diva/">
            <img src="/images/index/diva.png" alt="DIVA Media System">
        </a>
      </div>
    </div>
  </section>

  <hr>

  <section class="services">
    <div class="row">
      <div class="col-sm-6 col-sm-push-6">
        <h2>From Post to Broadcast</h2>
        <p>We develop, streamline, integrate, and upgrade state-of-the-art post production and broadcast facilities.</p>
        <p class="lead"><a href="/services/">Tailor a solution to your needs</a></p>
      </div>
      <div class="col-sm-6 col-sm-pull-6">
          <a href="/services/">
              <img src="/images/index/cables.jpg" alt="Router cabling"/>
          </a>
      </div>
    </div>
  </section>

  <hr>

  <section class="clients">
    <h1>Built with Group 6 Technologies</h1>
    <p>Our clients are always pushing the boundaries. Find out how we've helped them find their way.</p>

    <div class="row">
      {% assign clientNo = 1 %}
      {% for page in site.pages reversed %}
        {% if clientNo <= 4 and page.category == 'client' and page.article != false %}
          <div class="col-xs-6 col-sm-3">
            <a href="{{ page.url }}" title="{{ page.Title }}">
              <img src="images/thumbs/clients/{{ page.banner }}" alt="{{ page.Title }}">
            </a>
            {% assign clientNo = clientNo | plus: 1 %}
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>

</div>