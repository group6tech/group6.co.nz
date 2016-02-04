module Jekyll
  class ImgSrcSetTag < Liquid::Tag

		attr_accessor :markup

    def initialize(tag_name, variables, tokens)
      @variables = variables.strip.split(", ")
      @src = @variables[0]
      @alt = @variables[1]
      @mediaquery = @variables[2]

      super
    end

    def render(context)
			return "Bad options to img_srcset, syntax is {% img_srcset path/to/image.jpg, alt text}:" unless @src

      img_src = Liquid::Template.parse(@src).render(context)

			img_attrs = {}
			img_attrs["src"] = get_image_source(img_src, "pvw")

			sizes = []
			sizes << {:label => "sm", :width => 480}
			sizes << {:label => "md", :width => 656}
			sizes << {:label => "lg", :width => 768} # // Also the default
			sizes << {:label => "xl", :width => 1536}

			srcset = []
			sizes.each do |size|
				srcset << {:src => get_image_source(img_src, size[:label]), :width => size[:width]}
			end
			img_attrs["data-srcset"] = srcset.map{|i| "#{i[:src]} #{i[:width]}w"}.join(", ")

      if (@mediaquery)
        mediaqueries = @mediaquery.split("-")
        img_attrs["data-sizes"] = "(min-width: 1800px) #{mediaqueries[4]}vw, (min-width: 1400px) #{mediaqueries[3]}vw, (min-width: 992px) #{mediaqueries[2]}vw, (min-width: 544px) #{mediaqueries[1]}vw, #{mediaqueries[0]}vw"
      end

      if (@alt)
	      img_attrs["alt"] = Liquid::Template.parse(@alt).render(context)
      end

      img_attrs["class"] = "blur-up lazyload"

      "<img #{img_attrs.map {|k,v| "#{k}=\"#{v}\""}.join(" ")}>"
    end

		def get_image_source(src, size)
			src.sub(/(\.\w+)$/, "-#{size}" + '\1')
		end
  end
end

Liquid::Template.register_tag('img_srcset', Jekyll::ImgSrcSetTag)
