---
layout: base
title: Welcome
bodyClass: home
metaDesc: "Group 6 is your technology partner for television, broadcast and post production system design and integration. We look after everyone from single seat editing installations to national broadcasters."
socialDesc: "Group 6 is your technology partner for television, broadcast and post production system design and integration. We look after everyone from single seat editing installations to national broadcasters."
hidePageHeader: true
headerIncludes:
- home-jumbotron.html
---

<div class="container">
  <a class="card card-hero card-img-right diva" href="/diva/" itemscope itemtype="http://schema.org/Product">
    <div class="card-inner">
      <div class="card-img">
        {% img_srcset /images/content/index/diva.jpg, DIVA Media System, 100-100-90-50-60 %}
      </div>
      <div class="card-block">
        <h2 class="card-title" itemprop="name">DIVA Media System</h2>
        <div class="card-text">
          <p class="card-text">DIVA is a powerful distributed media management tool for the Avid post production environment.</p>
          <p class="card-text">Simplify setup, share files, and get cutting with a click.</p>
        </div>
        <div class="btn" itemprop="url">Learn about DIVA</div>
      </div>
    </div>
  </a>

  <section class="clients">
    <h1>Built with Group 6 Technologies</h1>
    <p>Our clients are always pushing the boundaries. Find out how we've helped them find their way.</p>

    <div class="row">
      {% assign clientNo = 1 %}
      {% assign client_pages = site.pages | sort:'displayOrder' | where: "category", "client" %}
    	{% for page in client_pages reversed %}
        {% if clientNo <= 4 and page.article %}
          <div class="col-sm-6 col-lg-3">
            <a class="card client-{{ page.title | slugify }}" href="{{ page.url }}" title="{{ page.title }}">
              <div class="card-inner">            
                <div class="card-img">
                  {% img_srcset /images/content/clients/{{ page.banner }}.jpg, {{ page.title }}, 100-50-50-25-25 %}
                </div>
                <div class="card-block">
                  <h4 class="card-title">{{ page.title }}</h4>
                </div>
              </div>
            </a>
          </div>
          {% assign clientNo = clientNo | plus: 1 %}
        {% endif %}
      {% endfor %}
    </div>
  </section>

</div>
